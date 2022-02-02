const cors = require("cors");
const express = require("express");

const plantsRouter = require("./routers/plantsRouter");
const usersRouter = require("./routers/usersRouter");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/plants", plantsRouter);
app.use("/users", usersRouter);

module.exports = app;
