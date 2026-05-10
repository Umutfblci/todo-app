const express = require("express");
const taskController = require("./../controller/taskController");
const app = express();
app.use(express.json());

const router = express.Router();

router.route("/").get(taskController.getAllTasks).post(taskController.addTask);
router
  .route("/:id")
  .get(taskController.getSingleTask)
  .delete(taskController.deleteTask)
  .patch(taskController.patchTask);
module.exports = router;
