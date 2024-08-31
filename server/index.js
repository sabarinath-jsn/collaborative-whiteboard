const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  // Listen for drawing events and broadcast them to all connected clients
  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data);
  });

  // Handle user disconnects
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

let users = {};

io.on('connection', (socket) => {
  console.log('New client connected');
  users[socket.id] = socket.id;  // Example user ID

  io.emit('users', Object.values(users));  // Broadcast the updated user list

  socket.on('disconnect', () => {
    delete users[socket.id];
    io.emit('users', Object.values(users));  // Update user list on disconnect
  });

  socket.on('drawing', (data) => {
    socket.broadcast.emit('drawing', data);
  });
});
