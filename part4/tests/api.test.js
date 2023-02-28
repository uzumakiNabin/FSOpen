const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const { initialBlogs, blogsInDb } = require("./api_test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogModelList = initialBlogs.map((blog) => new Blog(blog));
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

  const savedBlog = await api.post("/api/blogs").send(newBlog);
  expect(savedBlog.body.id).toBeDefined();
});

test("successfull POST request to /api/blogs creates a new blog post and is saved correctly", async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  };

  const savedBlog = await api.post("/api/blogs").send(newBlog);

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

  const savedBlog = await api.post("/api/blogs").send(newBlog);

  expect(savedBlog.body.likes).toBe(0);
});

describe("if title or url are missing, backend responds with status code 400", () => {
  test("title missing", async () => {
    const newBlog = {
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("url missing", async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });

  test("author missing", async () => {
    const newBlog = {
      title: "TDD harms architecture",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 10,
    };
    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
