const express = require("express");
const app = express();

const isBoolean = (req, res, next) => {
  const completed = req.body.completed;

  if (!completed || typeof completed !== "boolean") {
    console.log(typeof completed);
    return res.status(400).json({
      status: "failed",
      message: "completion value cannot be empty or not boolean value!",
    });
  }
  next();
};

module.exports = isBoolean;
