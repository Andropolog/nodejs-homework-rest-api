const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(logger('combined'));
app.use(cors());
app.use(express.json());

app.use((_, res) => {
  res.status(404).send({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((error, _, res, __) => {
  const { code = 500, message = "Server error" } = error;
  res.status(code).json({
    status: "error",
    code,
    message,
  });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(async () => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => console.log(error));

module.exports = app;