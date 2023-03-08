const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;
  try {
    if (!request.user) {
      return response.status(401).send({ error: "invalid token" });
    }
    const user = await User.findById(request.user);
    const blog = new Blog({ ...body, user: user._id });
    const savedBlog = await (await blog.save()).populate("user", { username: 1, name: 1 });
    await User.findByIdAndUpdate(request.user, { $push: { blogs: savedBlog._id } });
    response.status(201).json(savedBlog);
  } catch (ex) {
    next(ex);
  }
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1 });
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).send({ error: "invalid token" });
    }
    const blogToBeDeleted = await Blog.findById(request.params.id);
    if (blogToBeDeleted) {
      if (request.user === blogToBeDeleted.user.toString()) {
        const deletedBlog = await Blog.findByIdAndRemove(request.params.id);
        if (deletedBlog) {
          response.status(204).end();
        } else {
          response.status(404).send({ error: "cannot find" });
        }
      } else {
        return response.status(401).send({ error: "unauthorized" });
      }
    } else {
      response.status(404).send({ error: "cannot find" });
    }
  } catch (ex) {
    next(ex);
  }
});

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    if (!request.user) {
      return response.status(401).send({ error: "invalid token" });
    }
    const blogToBeUpdated = await Blog.findById(request.params.id);
    if (blogToBeUpdated) {
      if (request.user === blogToBeUpdated.user.toString()) {
        const blog = request.body;
        const updatedBlog = await (
          await Blog.findByIdAndUpdate(request.params.id, blog, {
            new: true,
            runValidators: true,
            context: "query",
          })
        ).populate("user", { username: 1, name: 1 });
        response.json(updatedBlog);
      } else {
        return response.status(401).send({ error: "unauthorized" });
      }
    } else {
      response.status(404).send({ error: "cannot find" });
    }
  } catch (ex) {
    next(ex);
  }
});

module.exports = blogsRouter;
