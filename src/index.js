const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

users = [];
connections = [];

io.sockets.on('connection', (socket) => {
  console.log('Connect');
  connections.push(socket);

  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Disconnect');
  });

  socket.on('SEND_MESSAGE', (data) => {
    io.sockets.emit('ADD_MESSAGE', {
      msg: data.msg,
      name: data.name,
      className: data.className,
    });
  });
});

// Server start
const PORT = process.env.PORT || 3000;
server.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`Server is running on ${PORT}`);
});
