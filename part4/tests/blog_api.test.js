const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const { initialBlogs, nonExistingId, blogsInDb } = require("./api_test_helper");
const api = supertest(app);

let auth = {};
let authUser = {};

beforeAll(async () => {
  await User.deleteMany({});
  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash });
  authUser = await user.save();

  auth = await api.post("/api/login").send({ username: "root", password: "sekret" });
  auth = auth.body;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogModelList = initialBlogs.map((blog) => new Blog({ ...blog, user: authUser._id }));
  const promiseArray = blogModelList.map((blogModel) => blogModel.save());
  await Promise.all(promiseArray);
});

test("all blogs are returned and are in json format", async () => {
  const response = await api.get("/api/blogs");
  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/application\/json/);
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("unique identifier property of blog is named id", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  const savedBlog = await await api.post("/api/blogs").set("Authorization", `Bearer ${auth.token}`).send(newBlog);
  expect(savedBlog.body.id).toBeDefined();
});

test("successfull POST request to /api/blogs creates a new blog post and is saved correctly", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  const savedBlog = await api.post("/api/blogs").set("Authorization", `Bearer ${auth.token}`).send(newBlog);

  const blogsAtEnd = await blogsInDb();

  expect(savedBlog.statusCode).toBe(201);
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1);
  expect(savedBlog.body.title).toBe(newBlog.title);
  expect(savedBlog.body.author).toBe(newBlog.author);
  expect(savedBlog.body.url).toBe(newBlog.url);
  expect(savedBlog.body.likes).toBe(newBlog.likes);
});

test("if likes is missing from request, it will default to 0", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  };

  const savedBlog = await api.post("/api/blogs").set("Authorization", `Bearer ${auth.token}`).send(newBlog);

  expect(savedBlog.body.likes).toBe(0);
});

describe("if title or url are missing, backend responds with status code 400", () => {
  test("title missing", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };

    await api.post("/api/blogs").send(newBlog).set("Authorization", `Bearer ${auth.token}`).expect(400);
  });

  test("url missing", async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    };
    await api.post("/api/blogs").send(newBlog).set("Authorization", `Bearer ${auth.token}`).expect(400);
  });

  test("author missing", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 10,
    };
    await api.post("/api/blogs").send(newBlog).set("Authorization", `Bearer ${auth.token}`).expect(400);
  });
});

describe("deleting blog", () => {
  test("successfull delete will send status code 204", async () => {
    const currentBlogs = await blogsInDb();
    const blogToDelete = currentBlogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", `Bearer ${auth.token}`).expect(204);
  });

  test("trying to delete non existing blog will send status code 404", async () => {
    const nonExistingBlogId = await nonExistingId();
    await api.delete(`/api/blogs/${nonExistingBlogId}`).set("Authorization", `Bearer ${auth.token}`).expect(404);
  });

  test("deleting another user's blog will send status code 401 unauthorized", async () => {
    const passwordHash = await bcrypt.hash("password", 10);
    const newUser = new User({ username: "new_user", passwordHash });
    await newUser.save();
    const newAuth = await api.post("/api/login").send({ username: "new_user", password: "password" });
    const currentBlogs = await blogsInDb();
    const blogToDelete = currentBlogs[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).set("Authorization", `Bearer ${newAuth.body.token}`).expect(401);
  });
});

describe("updating blog", () => {
  test("successfull update will send status code 200", async () => {
    const currentBlogs = await blogsInDb();
    const blogToUpdate = currentBlogs[0];
    const blogWithUpdatedValues = {
      title: blogToUpdate.title + "(updated)",
      author: blogToUpdate.author + "(updated)",
      url: blogToUpdate.url + "_updated",
      likes: blogToUpdate.likes + 10,
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).set("Authorization", `Bearer ${auth.token}`).send(blogWithUpdatedValues).expect(200);
  });

  test("title missing will yield status code 400", async () => {
    const currentBlogs = await blogsInDb();
    const blogToUpdate = currentBlogs[0];
    const blogWithUpdatedValues = {
      title: "",
      author: blogToUpdate.author + "(updated)",
      url: blogToUpdate.url + "_updated",
      likes: blogToUpdate.likes + 10,
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).set("Authorization", `Bearer ${auth.token}`).send(blogWithUpdatedValues).expect(400);
  });

  test("url missing will yield status code 400", async () => {
    const currentBlogs = await blogsInDb();
    const blogToUpdate = currentBlogs[0];
    const blogWithUpdatedValues = {
      title: blogToUpdate.title + "(updated)",
      author: blogToUpdate.author + "(updated)",
      url: "",
      likes: blogToUpdate.likes + 10,
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).set("Authorization", `Bearer ${auth.token}`).send(blogWithUpdatedValues).expect(400);
  });

  test("author missing will yield status code 400", async () => {
    const currentBlogs = await blogsInDb();
    const blogToUpdate = currentBlogs[0];
    const blogWithUpdatedValues = {
      title: blogToUpdate.title + "(updated)",
      author: "",
      url: blogToUpdate.url + "_updated",
      likes: blogToUpdate.likes + 10,
    };
    await api.put(`/api/blogs/${blogToUpdate.id}`).set("Authorization", `Bearer ${auth.token}`).send(blogWithUpdatedValues).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
