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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

