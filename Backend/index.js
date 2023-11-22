const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('firebase-admin');
const { ref, push, onValue } = require('firebase/database');
const cors = require('cors');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wishchatprog2-default-rtdb.europe-west1.firebasedatabase.app/"
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  }
});
const database = admin.database();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on('send message', (message) => {
    const messagesRef = ref(database, 'messages');
    push(messagesRef, message);
    io.to(message.room).emit('chat message', message);
    console.log(`Message from ${message.name}: ${message.message}`);
  });

  socket.on('private message', ({ recipient, message }) => {
    const recipientSocket = io.sockets.sockets.get(recipient);
    if (recipientSocket) {
      recipientSocket.emit('private message', { sender: socket.id, message });
      console.log(`Private message from ${socket.id} to ${recipient}: ${message}`);
    } else {
      console.log(`Recipient ${recipient} not found.`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

io.on('error', (err) => {
  console.error('Socket.IO error:', err.message);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error('Internal Server Error:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
