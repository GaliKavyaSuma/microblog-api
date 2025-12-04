const db = require("../config/db");

// Create Post controller
exports.createPost = (req, res) => {
  const { content } = req.body;
  const userId = req.user.id; // This comes from JWT middleware

  if (!content) {
    return res.status(400).json({ message: "Post content is required" });
  }

  const query = `INSERT INTO posts (user_id, content) VALUES (?, ?)`;
  db.run(query, [userId, content], function (err) {
    if (err) {
      return res.status(500).json({ message: "Error creating post" });
    }

    return res.status(201).json({
      message: "Post created successfully",
      postId: this.lastID,
    });
  });
};

// Get all posts
exports.getAllPosts = (req, res) => {
  const query = `
    SELECT posts.id, posts.content, posts.created_at, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    ORDER BY posts.created_at DESC
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching posts" });
    }

    return res.status(200).json(rows);
  });
};

// Delete Post controller
exports.deletePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  // Check if post belongs to user
  const query = `SELECT * FROM posts WHERE id = ?`;
  db.get(query, [postId], (err, post) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user_id !== userId) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    // Delete the post
    const deleteQuery = `DELETE FROM posts WHERE id = ?`;
    db.run(deleteQuery, [postId], function (err) {
      if (err) return res.status(500).json({ message: "Error deleting post" });

      return res.status(200).json({ message: "Post deleted successfully" });
    });
  });
};

// Update Post controller
exports.updatePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;

  if (!content) return res.status(400).json({ message: "Content is required" });

  // Check if post belongs to user
  const query = `SELECT * FROM posts WHERE id = ?`;
  db.get(query, [postId], (err, post) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user_id !== userId) {
      return res.status(403).json({ message: "You can only update your own posts" });
    }

    // Update post
    const updateQuery = `UPDATE posts SET content = ? WHERE id = ?`;
    db.run(updateQuery, [content, postId], function (err) {
      if (err) return res.status(500).json({ message: "Error updating post" });

      return res.status(200).json({ message: "Post updated successfully" });
    });
  });
};

// Get Single Post by ID
exports.getPostById = (req, res) => {
  const postId = req.params.id;

  const query = `
    SELECT posts.id, posts.content, posts.created_at, users.username
    FROM posts
    JOIN users ON posts.user_id = users.id
    WHERE posts.id = ?
  `;

  db.get(query, [postId], (err, post) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json(post);
  });
};

// Like/Unlike Post
exports.likePost = (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;

  // Check if already liked
  const checkQuery = `SELECT * FROM likes WHERE user_id = ? AND post_id = ?`;
  db.get(checkQuery, [userId, postId], (err, like) => {
    if (err) return res.status(500).json({ message: "Server error" });

    if (like) {
      // Unlike
      const deleteQuery = `DELETE FROM likes WHERE id = ?`;
      db.run(deleteQuery, [like.id], function (err) {
        if (err) return res.status(500).json({ message: "Error unliking post" });
        return res.status(200).json({ message: "Post unliked" });
      });
    } else {
      // Like
      const insertQuery = `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`;
      db.run(insertQuery, [userId, postId], function (err) {
        if (err) return res.status(500).json({ message: "Error liking post" });
        return res.status(200).json({ message: "Post liked" });
      });
    }
  });
};
