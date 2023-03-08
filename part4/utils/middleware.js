const jwt = require("jsonwebtoken");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "invalid id" });
  } else if (error.name === "TypeError") {
    return response.status(500).end();
  } else if (error.name === "ValidationError") {
    return response.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).send({ error: "invalid token" });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = (request, response, next) => {
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) {
      request.user = "";
    }
    request.user = decodedToken.id;
  } catch (ex) {
    request.user = "";
  }
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
