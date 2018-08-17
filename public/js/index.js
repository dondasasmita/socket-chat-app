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

// Custom listen for newLocationMessage event from server
socket.on("newLocationMessage", function(message) {
  console.log("newLocationMessage", message);
  let li = jQuery("<li></li>");
  // put url as attribute and open in a new tab
  let a = jQuery("<a target=blank>My location</a>");
  li.text(`${message.from}: `);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

// On submit
jQuery("#message-form").on("submit", function(e) {
  //Override the default behavior upon clicking the submit button
  e.preventDefault();
  // Variable to store the message box
  let messageBox = jQuery("[name=message]");
  socket.emit(
    "sendMessage",
    {
      from: "User",
      text: messageBox.val()
    },
    // call back function upon successful message submission
    function() {
      // clear the form by giving the value an empty string
      messageBox.val("");
    }
  );
});

// When user click the button, share geolocation api
const locationButton = jQuery("#send-loc");
locationButton.on("click", () => {
  if (!navigator.geolocation) {
    return alert("Location is not supported by browser");
  } else {
    navigator.geolocation.getCurrentPosition(
      // Callback upon success
      position => {
        socket.emit("shareLocation", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      // Error callback
      () => {
        alert("Unable to get location");
      }
    );
  }
});
