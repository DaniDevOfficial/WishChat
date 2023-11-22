const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('firebase-admin');
const {ref, push } = require('firebase/database');
const cors = require('cors');
const serviceAccount = require('./serviceAccountKey.json')
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
  console.log('A user connected');

  socket.on('send message', (message) => {
    const messagesRef = ref(database, 'messages');
    push(messagesRef, message);
    console.log(message);
    io.emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
