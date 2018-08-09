let socket = io();

socket.on("connect", function() {
  console.log("Connected to server");

  // Fire sendMessage event
  socket.emit("sendMessage", {
    from: "judy@gmail.com",
    text: "hello sending message"
  });
});

// Listen for disconnect event
socket.on("disconnect", function() {
  console.log("Disconnected from server");
});

// Custom listen for newMessage from server
socket.on("newMessage", function(data) {
  console.log("newMessage", data);
});
