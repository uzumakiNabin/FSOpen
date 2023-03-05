const loginRouter = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;
  const user = await User.findOne({ username });
  const isPasswordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash);
  if (!(user && isPasswordCorrect)) {
    return response.status(401).send({ error: "invalid username or password" });
  }
  const dataForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(dataForToken, process.env.SECRET);
  response.json({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
