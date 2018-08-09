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

// Registered event listener for a new connection
io.on("connection", socket => {
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("User was disconnected");
  });
});

// App listening on port 3000
server.listen(port, () => {
  console.log(`Running on port ${port}`);
});
