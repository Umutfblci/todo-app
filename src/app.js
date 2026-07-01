const express = require("express");
const cors = require("cors");
const taskRouter = require("./routes/taskRoutes");
const router = require("./routes/taskRoutes");
const app = express();

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

router.param("id", (req, res, next, val) => {
  console.log(`requested param ${val}`);
  next();
});
//ROUTES
app.use(cors());
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);
module.exports = app;
