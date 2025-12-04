const express = require("express");
const app = express();
const db = require("./config/db");
require("./models/userModel");
require("./models/postModel");
require("./models/likeModel");


// This lets us read JSON from requests
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));


// Basic route to test server
app.get("/", (req, res) => {
  res.send("Microblogging API is running!");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
