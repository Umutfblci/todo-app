const fs = require("fs");
let tasks = JSON.parse(fs.readFileSync(`${__dirname}/../tasks.json`));

exports.getAllTasks = (req, res) => {
  res.status(200).json({
    status: "succesful",
    results: tasks.length,
    data: { tasks },
  });
};

exports.getSingleTask = (req, res) => {
  const id = req.params.id * 1;
  const task = tasks.find((el) => el.id == id);

  if (!task) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }

  res.status(200).json({ status: "succesful", data: { task } });
};

exports.addTask = (req, res) => {
  const lastID = tasks.length > 0 ? tasks[tasks.length - 1].id : 0;
  const newTask = Object.assign({ id: lastID + 1 }, req.body);

  tasks.push(newTask);

  fs.writeFile(`${__dirname}/../tasks.json`, JSON.stringify(tasks), (err) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Error writing file" });
    res.status(201).json({ status: "success", data: { task: newTask } });
  });
};

exports.deleteTask = (req, res) => {
  const targetParam = req.params.id * 1;
  const updatedTasks = tasks.filter((task) => task.id !== targetParam);

  if (tasks.length === updatedTasks.length) {
    return res.status(404).json({ status: "fail", message: "ID not found" });
  }

  fs.writeFile(
    `${__dirname}/../tasks.json`,
    JSON.stringify(updatedTasks),
    (err) => {
      if (err)
        return res
          .status(500)
          .json({ status: "error", message: "Error writing file" });
      tasks = updatedTasks;
      res.status(204).json({ status: "successful", data: null });
    },
  );
};

exports.patchTask = (req, res) => {
  const targetParam = req.params.id * 1;
  const index = tasks.findIndex((el) => el.id == targetParam);

  if (index === -1) {
    return res.status(404).json({ status: "fail", message: "invalid id" });
  }

  const updatedTask = { ...tasks[index], ...req.body };
  tasks[index] = updatedTask;

  fs.writeFile(`${__dirname}/../tasks.json`, JSON.stringify(tasks), (err) => {
    if (err)
      return res
        .status(500)
        .json({ status: "error", message: "Error writing file" });
    res.status(200).json({ status: "successful", data: { task: updatedTask } });
  });
};
