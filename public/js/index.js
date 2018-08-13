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
  let li = jQuery("<li></li>");
  li.text(`${message.from}: ${message.text}`);
  jQuery("#messages").append(li);
});

// On submit
jQuery("#message-form").on("submit", function(e) {
  //Override the default behavior upon clicking the submit button
  e.preventDefault();
  socket.emit(
    "sendMessage",
    {
      from: "User",
      text: jQuery("[name=message]").val()
    },
    function() {}
  );
});
