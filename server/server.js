const path = require("path");
const express = require("express");
const socketIO = require("socket.io");
const http = require("http");
const { generateMessage } = require("./utilities/message");
const { getLocation } = require("./utilities/geolocation");

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
  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  // Prompt other users that a new user has joined
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

  // Listen for sendMessage event
  socket.on("sendMessage", (message, callback) => {
    console.log("sendMessage", message);

    // Fire sendMessage event to client
    io.emit("newMessage", generateMessage(message.from, message.text));
    callback("This is from the server.");
  });

  // Listen for shareLocation
  socket.on("shareLocation", coords => {
    // Fire showLocation event to client
    io.emit(
      "newMessage",
      generateMessage(
        "Admin",
        `latitude : ${coords.latitude} longitude : ${coords.longitude}`
      )
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
