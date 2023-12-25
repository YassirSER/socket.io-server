// require("dotenv").config();
// let { CLIENTURL } = process.env;

const io = require("socket.io")(3001, {
  cors: {
    origin: "https://whatsapp-clone-next14.vercel.app/",
    methods: ["GET", "POST"],
  },
});

var connectedUsers = {};

io.on("connection", (socket) => {
  console.log(`user ${socket.id} is connected`);
  //   connectedUsers.push(socket.id);

  io.on("loggedin", (name) => {
    connectedUsers[name] = socket.id;
    console.log({ connectedUsers });
  });

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on("send_msg", (message, info) => {
    io.to(info.roomid).emit("receive_msg", message, info);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

console.log("hello");
