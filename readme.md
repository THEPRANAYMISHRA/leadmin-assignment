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
- User Login: POST /api/auth/login
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
