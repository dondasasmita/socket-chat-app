const path = require("path");
const express = require("express");

// Create App
const app = express();
// Path to public directory
const publicPath = path.join(__dirname, "../public");
// Port
const port = process.env.PORT || 3000;

// Render index html
app.get("/", (req, res) => {
  res.sendFile(publicPath + "/index.html");
});

// App listening on port 3000
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
