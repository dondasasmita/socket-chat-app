const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");

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
  socket.emit("welcome", {
    from: "Admin",
    text: "Welcome to the chat app",
    createdAt: new Date().getTime()
  });

  // Prompt other users that a new user has joined
  socket.broadcast.emit("newUser", {
    from: "Admin",
    text: "New user joined",
    createdAt: new Date().getTime()
  });

  // Listen for sendMessage event
  socket.on("sendMessage", message => {
    console.log("sendMessage", message);

    // Fire sendMessage event to client
    // io.emit("newMessage", {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
    socket.broadcast.emit("newMessage", {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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
