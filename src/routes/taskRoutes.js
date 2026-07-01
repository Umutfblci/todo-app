const express = require("express");
const taskController = require("../controllers/taskController");
const validateTaskInput = require("../middlewares/inputValidation");
const completionValidator = require("../middlewares/completionValidator");

const router = express.Router();

router
  .route("/")
  .get(taskController.getAllTasks)
  .post(validateTaskInput, completionValidator, taskController.createTask);
router
  .route("/:id")
  .get(taskController.getTask)
  .delete(taskController.deleteTask)
  .patch(taskController.updateTask);
module.exports = router;
