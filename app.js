const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const api = require("./routes/api");
const path = require("path");

require("dotenv").config();

const app = express();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => console.log(error));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", api.users);
app.use("/api/v1/contacts", api.contacts);

const usersDir = path.join(process.cwd(), "/public/avatars");
app.use('/avatars', express.static(usersDir));
app.use((_, res) => {
  console.log("error")
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


module.exports = app;