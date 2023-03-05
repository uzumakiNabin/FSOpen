const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

usersRouter.post("/", async (request, response, next) => {
  const { name, username, password } = request.body;
  if (!password || password.length < 3) {
    return response.status(400).send({ error: "invalid password" });
  }
  const saltRounds = 10;
  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, username, passwordHash });
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
  } catch (ex) {
    next(ex);
  }
});

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, author: 1, url: 1 });
  response.json(users);
});

usersRouter.delete("/:id", async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = usersRouter;
