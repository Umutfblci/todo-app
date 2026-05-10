const express = require("express");
const taskRouter = require("./routes/taskRoute");
const app = express();

// Enable CORS for frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

//ROUTES
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
