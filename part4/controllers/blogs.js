const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  try {
    const blog = new Blog(request.body);
    const newBlog = await blog.save();
    response.status(201).json(newBlog);
  } catch (ex) {
    next(ex);
  }
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndRemove(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
