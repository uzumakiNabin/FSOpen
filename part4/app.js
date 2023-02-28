const config = require("./utils/config");
const express = require("express");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("express-async-errors");

const app = express();

mongoose.set("strictQuery", false);

logger.info("connecting to MongoDB");

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB: ", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  morgan.token("body", (req) => JSON.stringify(req.body));
  app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"));
}

app.use("/api/blogs", blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
