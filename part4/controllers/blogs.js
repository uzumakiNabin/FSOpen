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
  const deletedBlog = await Blog.findByIdAndRemove(request.params.id);
  if (deletedBlog) {
    response.status(204).end();
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const blog = request.body;
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    response.json(updatedBlog);
  } catch (ex) {
    next(ex);
  }
});

module.exports = blogsRouter;
