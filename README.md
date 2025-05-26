
# Temus Avatar Hackathon

Your objective in this Hackathon is to think of amazing, unique and creative Avatar use-cases and create a user journey UI/UX client for your users to experience this *Avatar Product*.

This repository is just a working example to work with the Temus Avatar. You don't need to based your design on this repo. Try not to limit your imagination! 

Feel free to start from a fresh new repo, taking working example code from here!

Here are some ideas to get you started:

1. A side-by-side Avatar study agent

2. A dedicated full-screen customer service Avatar agent

3. An embeddable Avatar javascript in external websites


## How to Get Started

Run this example NextJS repository:

```bash
# Create a new .env file from the example env file
cp .env.example .env
# Update the following variables in the .env file:
# NEXT_PUBLIC_HTTP_SERVER_URL
# NEXT_PUBLIC_WSS_SERVER_URL
# NEXT_PUBLIC_UNREAL_AVATAR_URL
# NEXT_PUBLIC_API_KEY

# Install dependencies
npm install

# Start the server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## More about the Avatar SDK

Note: Only 1 concurrent Avatar is available for each Group/Api Key

1. First things first, use this endpoint `{base_url}/api/conversation/available` to check if an Avatar is available (Example in `src/components/StartConversationButton/index.tsx`).

2. Use the websocket (Example in `src/components/Conversation/index.tsx`) to start a new conversation session.

    - Use the Api Key provided to your team to connect to the Temus Backend

    - Use the websocket params to customize your Avatar experience

        - startMessage: The initial welcome message that will be utter by the Avatar

        - prompt: The system prompt to customer the conversation behavior of your Avatar (I highly welcome keeping the avatar response short and responsive to encourage 2-way dialogue with the users)

        - temperature & topP (0 - 1): To help determine how creative your Avatar's response is. (A lower value (e.g. 0.3) makes the Avatar more focused and deterministic, while a higher value (e.g. 0.9) allows for more diverse and creative)

        - avatar: Select 1 Avatar out of 6 to use (henry, jessie, kenji, kevin, martha, michelle). The Avatar profiles are available in `avatars`

        - backgroundImageUrl: A publicliy accessible image url for the Avatar background

        - voice: Select 1 Voice out of 6 to use (henry, jessie, kenji, kevin, martha, michelle).

3. After successfully connecting to the websocket, an `avatar_uuid` will be provided, please use this `avatar_uuid` to connect to the Avatar Video (Example in `src/components/PixelStreamingVideo/index.tsx`)

