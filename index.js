const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const bot = require("./bot");

// Initialization
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// MiddleWares
app.use(express.static(path.join(__dirname, "/public/dist")));

// Home Route
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// Socket Connection
io.on("connection", (socket) => {
  console.log("New Connection..");
  socket.emit("message", "Hello Sir, Ask me something I know.", "bot");
  socket.on("message", (cmd) => {
    bot(cmd, (result) => {
      socket.emit("message", result.answer, "bot");
    });
  });
});

// App Running
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("App Running on Port:", PORT));
