const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};

io.on('connection', (socket) => {
   const { user } = socket.handshake.query;
   connectedUsers[user] = socket.id;
});

mongoose
   .connect(process.env.MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('Connected'))
   .catch((err) => console.log('Error', err.stack));

app.use((req, res, next) => {
   req.io = io;
   req.connectedUsers = connectedUsers;

   return next();
});

app.use(cors());
app.use(express.json());

app.use(routes);

module.exports = app;
