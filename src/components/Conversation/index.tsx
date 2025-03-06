'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { ConversationProps, AvatarWebsocketMessage } from "./types";
import PixelStreamingVideo from "../PixelStreamingVideo";
import useWebSocket, { ReadyState } from "react-use-websocket";
import AudioConversation from "../AudioConversation";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const rtcConfig = process.env.NEXT_PUBLIC_USE_TURN_SERVER === 'true' ? {
  iceServers: [
    { urls: `stun:${process.env.NEXT_PUBLIC_STUN_SERVER}` },
    {
      urls: `turn:${process.env.NEXT_PUBLIC_TURN_SERVER}`,
      username: process.env.NEXT_PUBLIC_TURN_USERNAME,
      credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL,
    },
  ]
} : undefined;

function Conversation(props: ConversationProps) {
  const router = useRouter();
  const {
    muted = false,
    conversationId,
    prompt,
    avatar,
    background,
    voice,
    conversationSetupParams,
    children,
    onVideoReady,
    setConversationAvatarType,
    setThinkingState,
    onConversationEnd,
    onWebsocketMessage,
  } = props;
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const [audioTrack, setAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [inputAudioTrack, setInputAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [outputAudioTrack, setOutputAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [avatarId, setAvatarId] = useState('');
  const [avatarName, setAvatarName] = useState('');
  const [profileUrl, setProfileUrl] = useState('/avatarProfile.jpeg');
  const [isAvatarEnabled, setIsAvatarEnabled] = useState<boolean | null>(false);

  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios.get(
      `${process.env.NEXT_PUBLIC_HTTP_SERVER_URL}/api/conversation/avatar-enabled`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    )
      .then((response) => {
        setConversationAvatarType?.(response.data.avatar_enabled ? 'avatar' : 'audio');
        setIsAvatarEnabled(response.data.avatar_enabled);
      })
      .catch((error) => {
        console.error('Error fetching avatar status:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push('/login');
        }
      });
  }, [router, setConversationAvatarType]);

  const {
    sendJsonMessage,
    lastJsonMessage,
    readyState,
  } = useWebSocket<AvatarWebsocketMessage | null>(
    isAvatarEnabled === null
      ? null
      : `${process.env.NEXT_PUBLIC_WSS_SERVER_URL}/api/conversation/${isAvatarEnabled ? 'webrtc' : 'webrtc/audio'}/${conversationId}`
  )

  const cleanupMedia = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }
    setAudioTrack(null);
    setInputAudioTrack(null);
    setOutputAudioTrack(null);
  }, []);

  const createPeerConnection = useCallback(async () => {
    // Clean up any existing connection first
    cleanupMedia();

    const peer = new RTCPeerConnection(rtcConfig);
    peerRef.current = peer;

    peer.ontrack = (event) => {
      event.streams.forEach((stream) => {
        if (remoteAudioRef.current && stream.getAudioTracks().length) {
          remoteAudioRef.current.srcObject = stream;
        }
      });
    };

    try {
      const stream = await navigator.mediaDevices?.getUserMedia({
        video: false,
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      mediaStreamRef.current = stream;
      stream.getTracks().forEach((track) => {
        if (peerRef.current && peerRef.current.signalingState !== 'closed') {
          peerRef.current.addTrack(track, stream);
        }
      });

      const [mainAudioTrack] = stream.getAudioTracks();
      setAudioTrack(mainAudioTrack);

      const offer = await peer.createOffer();
      await peer.setLocalDescription(new RTCSessionDescription(offer));

      return peer;
    } catch (error) {
      console.error('Error setting up peer connection:', error);
      cleanupMedia();
      return null;
    }
  }, [cleanupMedia]);

  useEffect(() => {
    if (!lastJsonMessage) {
      return;
    }

    const { type } = lastJsonMessage;

    if (type === 'status' && lastJsonMessage.avatar_uuid) {
      setAvatarId(lastJsonMessage.avatar_uuid);
      onVideoReady?.();
    }
    
    if (type === 'answer' && peerRef.current) {
      peerRef.current.setRemoteDescription(new RTCSessionDescription(lastJsonMessage.answer))
        .then(() => {
          // Get the output audio track
          peerRef.current?.getReceivers().forEach(receiver => {
            if (receiver.track.kind === 'audio') {
              setOutputAudioTrack(receiver.track);
            }
          });
        });
    }

    if (type === 'end_call') {
      cleanupMedia();
      onConversationEnd?.();
    }

    if (type === 'name') {
      setAvatarName(lastJsonMessage.name);
    }

    if (type === 'thinkingState') {
      setThinkingState?.(lastJsonMessage.thinking);
    }

    if (type === 'error' && lastJsonMessage.error === 'unauthorized') {
      router.push('/login');
    }

    onWebsocketMessage?.(lastJsonMessage);
  }, [lastJsonMessage, onConversationEnd, onVideoReady, onWebsocketMessage, setThinkingState, cleanupMedia, router]);

  useEffect(() => {
    if (readyState !== ReadyState.OPEN) {
      return;
    }

    const token = Cookies.get('auth_token');
    if (!token) {
      router.push('/login');
      return;
    }

    sendJsonMessage({
      type: "setup",
      token: token,
      param: {
        startMessage: "",
        prompt,
        avatar,
        background,
        voice,
        ...conversationSetupParams,
      }
    });

    createPeerConnection().then(peer => {
      if (peer) {
        sendJsonMessage({
          type: "offer",
          token: token,
          offer: peer.localDescription,
        });
      }
    });

    return () => {
      cleanupMedia();
    };
  }, [readyState, sendJsonMessage, conversationSetupParams, prompt, createPeerConnection, cleanupMedia, router]);

  useEffect(() => {
    if (!audioTrack) {
      return;
    }
    audioTrack.enabled = !muted;
  }, [muted]);

  return (
    <div className="h-full w-full relative overflow-hidden">
      {isAvatarEnabled === null ? (
        <div>Loading...</div>
      ) : isAvatarEnabled ? (
        <>
          <PixelStreamingVideo avatarId={avatarId} />
          {avatarName && (
            <div className="absolute top-0 left-0 py-2 px-3 mt-3 ml-3 border-round-xl" style={{ backgroundColor: 'rgba(211, 211, 211, 0.8)' }}>
              <p className="m-0 text-2xl text-black">{avatarName}</p>
            </div>
          )}
        </>
      ) : (
        <AudioConversation inputAudioTrack={inputAudioTrack} outputAudioTrack={outputAudioTrack} profileUrl={profileUrl} avatarName={avatarName} />
      )}
      <audio ref={remoteAudioRef} autoPlay />
      {children}
    </div>
  )
}

export default Conversation
