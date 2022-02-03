const cors = require("cors");
const express = require("express");

const plantsRouter = require("./routers/plantsRouter");
const usersRouter = require("./routers/usersRouter");
const gardensRouter = require("./routers/gardensRouter");
const gardenSpotsRouter = require("./routers/gardenSpotsRouter");

const app = express();

app.use(cors({
    origin: "*",
  }));
app.use(express.json());

app.use("/plants", plantsRouter);
app.use("/users", usersRouter);
app.use("/gardens", gardensRouter);
app.use("/gardenspots", gardenSpotsRouter);
module.exports = app;