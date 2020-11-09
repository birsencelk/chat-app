const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io')
const io = socket(server);

io.on("connection", socket=> {
  // console.log(socket);
  socket.emit("your id", socket.id);
  socket.on("send message",( body,time )=> {
    io.emit("message", body);
    io.emit("time", time);
  });
  // socket.on('change username', (username) => {
  //   io.emit("newUserName", username);
  // });
});

server.listen(8000, () => console.log("server running on port 8000"));