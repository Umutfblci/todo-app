const express = require("express");
const cors = require("cors");
const taskRouter = require("./routes/taskRoute");
const app = express();

//ROUTES
app.use(cors());
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);
module.exports = app;
