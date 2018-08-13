const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const { generateMessage } = require("./utilities/message");

// Path to public directory
const publicPath = path.join(__dirname, "../public");
// Port
const port = process.env.PORT || 3000;

// Create App
const app = express();
// Create http server
const server = http.createServer(app);
// Configured server to use socket io
const io = socketIO(server);

// Configured middleware
app.use(express.static(publicPath));

// Registered event listener
io.on("connection", socket => {
  console.log("New user connected");

  // Welcome message
  socket.emit("welcome", generateMessage("Admin", "Welcome to the chat app"));

  // Prompt other users that a new user has joined
  socket.broadcast.emit("newUser", generateMessage("Admin", "New user joined"));

  // Listen for sendMessage event
  socket.on("sendMessage", message => {
    console.log("sendMessage", message);

    // Fire sendMessage event to client except the sender itself
    socket.broadcast.emit(
      "newMessage",
      generateMessage(message.from, message.text)
    );
  });

  // Listen for disconnect event
  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

// App listening on port 3000
server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
