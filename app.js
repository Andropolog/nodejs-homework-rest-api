const mongoose = require("mongoose");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const api = require("./api");
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/v1/contacts", api.contacts);

app.use((_, res) => {
  res.status(404).json({
    status: "error",
    code: 404,
    message: "Not found",
  });
});

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message });
});

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(async () => {
    console.log("Database connection successful");
    app.listen(PORT);
  })
  .catch((error) => console.log(error));
