const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require('helmet');
const { HttpCode, LIMIT_JSON } = require("./config/constants");
const contactsRouter = require("./routes/api/contacts");
const usersRouter = require("./routes/api/users");

require("dotenv").config({ path: "./config/.env" });

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(helmet())
app.use(logger(formatsLogger));
app.use(express.static('public'))
app.use(cors());
app.use(express.json({limit: LIMIT_JSON})); // json

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({
    status: "error",
    code: HttpCode.NOT_FOUND,
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    status: "fail",
    code: HttpCode.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
});

module.exports = app;
