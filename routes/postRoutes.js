const express = require("express");
const router = express.Router();
const { createPost, getAllPosts, deletePost, updatePost, getPostById, likePost } = require("../controllers/postController");
const authenticateToken = require("../controllers/authMiddleware");

// POST /api/posts/create
router.post("/create", authenticateToken, createPost);

// GET /api/posts
router.get("/", getAllPosts);

// GET /api/posts/:id
router.get("/:id", getPostById);

// DELETE /api/posts/:id
router.delete("/:id", authenticateToken, deletePost);

// PUT /api/posts/:id
router.put("/:id", authenticateToken, updatePost);

// POST /api/posts/:id/like
router.post("/:id/like", authenticateToken, likePost);

module.exports = router;
