let socket = io();

socket.on("connect", function() {
  console.log("Connected to server");
});

// Listen for disconnect event
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

// Custom listen for newMessage event from server
socket.on("newMessage", function(data) {
  console.log("newMessage", data);
});
