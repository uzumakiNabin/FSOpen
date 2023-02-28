require("dotenv").config();

const MONGO_URI = process.env.NODE_ENV === "test" ? process.env.MONGO_TEST_URI : process.env.MONGO_URI;
const PORT = process.env.PORT;

module.exports = { MONGO_URI, PORT };
