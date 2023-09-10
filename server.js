const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const socketIo = require('socket.io'); 

const io = require('socket.io')(3000)

io.on('connection', socket => {
  socket.emit('chat-message', 'Hello World')
})

const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://wishchatprog2-default-rtdb.europe-west1.firebasedatabase.app/"
});

const app = express();
const server = http.createServer(app);

const messages = [];

app.use(bodyParser.json());

// Function to retrieve messages from the database
const getMessages = async () => {
  try {
    const db = admin.database();
    const messagesRef = db.ref('messages');

    const snapshot = await messagesRef.once('value');
    const messagesData = snapshot.val();

    const messagesArray = messagesData ? Object.values(messagesData) : [];
    return messagesArray;
  } catch (error) {
    console.error('Error retrieving messages:', error);
    throw error;
  }
};

app.post('/api/messages', async (req, res) => {
  const { text, user, recipient } = req.body;

  const newMessage = {
    text,
    user,
    recipient,
    timestamp: new Date().toISOString(),
  };

  try {
    const db = admin.database();
    const messagesRef = db.ref('messages');

    const newMessageRef = await messagesRef.push(newMessage);

    io.emit('newMessage', newMessage);

    console.log(`New Message: ${text} (User: ${user})`);

    // Call getMessages to get the latest messages and send them in the response
    const messagesArray = await getMessages();

    res.status(201).json({ message: `${text}`, messageId: newMessageRef.key, messages: messagesArray });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'An error occurred while creating the message' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    // Call getMessages to get the latest messages and send them in the response
    const messagesArray = await getMessages();
    res.json(messagesArray);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'An error occurred while retrieving messages' });
  }
});

const PORT = process.env.PORT || 5000;

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
