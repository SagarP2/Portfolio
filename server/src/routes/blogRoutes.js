const express = require("express");
const Blog = require("../models/Blog");
const router = express.Router();

// Create a new blog post
router.post("/add", async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    if (!title || !content || !author || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({ title, content, author, tags });
    await newBlog.save();

    res.status(201).json({ message: "Blog post added successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;