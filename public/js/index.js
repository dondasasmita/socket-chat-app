let socket = io();

socket.on("connect", function() {
  console.log("Connected to server");
});

// Listen for disconnect event
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

// Custom listen for newMessage event from server
socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});

// Listen to admin messages
socket.on("welcome", function(message) {
  console.log("welcome", message.text);
});

socket.on("newUser", function(message) {
  console.log("newUser", message.text);
});
