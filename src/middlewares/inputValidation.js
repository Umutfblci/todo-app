const express = require("express");
const app = express();

const validateTaskInput = (req, res, next) => {
  const { title } = req.body;
  if (!title || typeof title !== "string") {
    return res.status(400).json({
      status: "fail",
      message: "title is required",
    });
  }
  next();
};
module.exports = validateTaskInput;
