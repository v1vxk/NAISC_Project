# Backend API Documentation

## REST Endpoints

### Conversation Settings

#### Check Avatar Enabled Status
- **Endpoint**: `/api/conversation/available`
- **Method**: GET
- **Description**: Check if an avatar session is available
- **Parameters**: None
- **Response**:
  ```json
  {
    "voice_call_available": boolean
  }
  ```
- **Response Details**:
  - `voice_call_available`: Boolean value
    - `true`: Avatar is available
    - `false`: Avatar is not available

- **Status Codes**:
  - 200: Successful response
  - 500: Server error

- **Example Response**:
  ```json
  {
    "voice_call_available": true
  }
  ```


## WebSocket Connections

### Real-time Chat

#### Connection Details
- **WebSocket Endpoint**: `/api/conversation/webrtc/{conversation_id}`
- **Authentication**: Include token in connection json payload

#### Message Format
```json
{
  "type": "setup",
  "param": {
    "apiKey": "string",
    "startMessage": "string",
    "prompt": "string",
    "temperature": "float",
    "topP": "float",
    "avatar": "string",
    "backgroundImageUrl": "string",
    "voice": "string"
  }
}
```

#### Response Event Types
1. **Status Events**
   ```json
   {
     "type": "status",
     "avatar_uuid": "string"  // Avatar identifier when ready
   }
   ```

2. **WebRTC Events**
   ```json
   {
     "type": "answer",
     "answer": RTCSessionDescription  // WebRTC session description
   }
   ```

3. **State Events**
   ```json
   {
     "type": "thinkingState",
     "thinking": boolean  // Avatar thinking state
   }
   ```

4. **Error Events**
   ```json
   {
     "type": "error",
     "error": "string"  // Error type (e.g., "unauthorized")
   }
   ```

#### Event Handling
- `status`: Indicates avatar is ready with UUID
- `answer`: WebRTC session description for audio setup
- `thinkingState`: Indicates avatar processing state
- `error`: 
  - `unauthorized`: Redirects to login
  - Other error types may be provided
