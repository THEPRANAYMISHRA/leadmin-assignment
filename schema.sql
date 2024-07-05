CREATE TABLE Users (
    userId VARCHAR(255) PRIMARY KEY,
    deviceId VARCHAR(255),
    name VARCHAR(255),
    phone VARCHAR(255),
    availCoins INT DEFAULT 0,
    password VARCHAR(255),
    isPrime BOOLEAN DEFAULT false
);

CREATE TABLE ChatRooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    creatorId VARCHAR(255),
    participants JSON
);

CREATE TABLE Messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roomId INT,
    senderId VARCHAR(255),
    content TEXT
);

CREATE TABLE FriendRequests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    senderId VARCHAR(255),
    receiverId VARCHAR(255),
    status VARCHAR(255) DEFAULT 'pending'
);
