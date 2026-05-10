const express = require("express");
const taskRouter = require("./routes/taskRoute");
const app = express();

//ROUTES
app.use(express.json());

app.use("/api/v1/tasks", taskRouter);

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
