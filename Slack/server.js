const express = require("express");
const socketio = require("socket.io");
let namespaces = require("./data/namespaces");

const app = express();

app.use(express.static(__dirname + "/public"));

const expressServer = app.listen(9000, () => console.log("Running on 9000"));
const io = socketio(expressServer);

io.on("connection", (socket) => {
  const nsData = namespaces.map(({ img, endpoint }) => ({ img, endpoint }));
  socket.emit("namespaces", { data: nsData });
});

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on("connection", (socket) => {
    socket.emit("rooms", { data: namespace.getRooms() });

    socket.on("switchRoom", async ({ data: room }, numOfUsers) => {
      socket.join(room);
      const sockets = Array.from(
        await io.of(namespace.endpoint).in(room).allSockets()
      );
      numOfUsers(sockets.length);
    });

    socket.on('chatMessage', ({data: {username, message}}) => {
      const room = [...socket.rooms][1]
      const date = new Date
      io.of(namespace.endpoint).in(room).emit('newMessage', {data: {username, message, date:`${date.getHours()}:${date.getMinutes()}`}})
    })
  });
});
