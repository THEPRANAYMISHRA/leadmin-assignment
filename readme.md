# Secure Chat Room Application

## Installation

```bash
npm install
```

## Running the Application

```bash
node server.js
```

## API Endpoints

- User Registration: POST /api/auth/register

# Request body

```bash
{
  "userId": "testuser",
  "password": "password123",
  "deviceId": "device12345",
  "name": "Test User",
  "phone": "1234567890"
}
```

- User Login: POST /api/auth/login

# Request Body

```bash
{
  "userId": "testuser",
  "password": "password123"
}
```

- Create Chat Room: POST /api/chatrooms
- Join Room: POST /api/joinroom
- View Profile: GET /api/profile/:userId
- Send Friend Request: POST /api/friend-requests

## Packages and tools

- express
- mysql2
- sequelize
- jsonwebtoken
- bcryptjs
- dotenv
- socket.io
