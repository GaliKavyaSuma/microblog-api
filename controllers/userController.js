const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Signup controller
exports.signup = (req, res) => {
  const { username, email, password } = req.body;

  // Check missing fields
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Insert user
  const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;

  db.run(query, [username, email, hashedPassword], function (err) {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "User already exists" });
    }

    return res.status(201).json({
      message: "User created successfully",
      userId: this.lastID,
    });
  });
};

// Login controller
exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // Find user
  const query = `SELECT * FROM users WHERE email = ?`;
  db.get(query, [email], (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      "SECRET_KEY",
      { expiresIn: "24h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
    });
  });
};
