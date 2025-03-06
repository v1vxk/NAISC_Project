import { Button } from 'primereact/button';
import { MicIcon, MicOffIcon, XIcon } from 'lucide-react';
import { VideoChatControlsProps } from './types';
import { useEffect, useState } from 'react';
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const ICON_SIZE = 32

function VideoChatControls(props: VideoChatControlsProps) {
  const { muted, setMuted, onMuteClick, onExitClick } = props
  const [isAvatarEnabled, setIsAvatarEnabled] = useState<boolean | null>(false);
  const router = useRouter();

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
        setIsAvatarEnabled(response.data.avatar_enabled);
      })
      .catch((error) => {
        console.error('Error fetching avatar status:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          router.push('/login');
        }
      });
  }, [router]);

  // Effect for keypress event
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent): void => {
      if (event.code === "Space") {
        event.preventDefault();
        if (setMuted) {
          setMuted(!muted);
        }
      }
    };

    // Add event listener
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [muted]);

  return (
    <div 
      className="absolute bottom-0 w-full flex align-items-center justify-content-center gap-4" 
      style={{ paddingBottom: isAvatarEnabled ? undefined : '20px' }}
      {...(isAvatarEnabled && { className: "absolute bottom-0 p-4 w-full flex align-items-center justify-content-center gap-4" })}
    >
      <Button
        rounded
        raised
        onClick={onMuteClick}
        className="p-3 h-4rem w-4rem"
        severity={muted ? 'danger' : 'secondary'}
        icon={muted ? <MicOffIcon width={ICON_SIZE} height={ICON_SIZE} /> : <MicIcon width={ICON_SIZE} height={ICON_SIZE} />}
      />
      <Button
        rounded
        raised
        onClick={onExitClick}
        className="p-3 h-4rem w-4rem"
        severity="danger"
        icon={<XIcon width={ICON_SIZE} height={ICON_SIZE} />}
      />
    </div>
  )
}

export default VideoChatControls
