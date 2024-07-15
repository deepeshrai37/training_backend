const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(
  "mongodb+srv://admin_social:deepesh123@mongodashboard.vk9mql9.mongodb.net/?retryWrites=true&w=majority&appName=MongoDashboard",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const blogSchema = new mongoose.Schema({
  image: String,
  content: String,
});

const Blog = mongoose.model("Blog", blogSchema);

// Routes
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/blogs", async (req, res) => {
  const blog = new Blog({
    image: req.body.image,
    content: req.body.content,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
