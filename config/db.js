const sqlite3 = require("sqlite3").verbose();

// Create or open the database file
const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

module.exports = db;
