"use strict";
var dbConn = require("./../../config/db.config");

var Task = function (task) {
  this.id = task.id;
  this.heading = task.heading;
  this.description = task.description;
  this.image = task.image;
  this.priority = task.priority;
  this.dateTime = task.dateTime;
};

Task.create = function (newTask, result) {
  dbConn.query("INSERT INTO tasks set ?", newTask, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(
        {
          error: true,
          message: err?.sqlMessage ?? "Failed to add task!",
          status: 400,
        },
        null
      );
    } else {
      result(null, res.insertId);
    }
  });
};

Task.findById = function (id, result) {
  dbConn.query("Select * from tasks where id = ? ", id, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else if (res?.length === 0) {
      result({ error: true, message: "Task not found!", status: 404 }, null);
    } else {
      result(null, res[0]);
    }
  });
};

Task.findAll = function (result) {
  dbConn.query("Select * from tasks ORDER BY dateTime ASC", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(
        {
          error: true,
          message: err?.sqlMessage ?? "Failed to fetch tasks!",
          status: 400,
        },
        null
      );
    } else {
      result(null, res);
    }
  });
};

Task.update = function (id, task, result) {
  dbConn.query(
    "UPDATE tasks SET heading=?,description=?,priority=? WHERE id = ?",
    [task.heading, task.description, task.priority, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(
          {
            error: true,
            message: err?.sqlMessage ?? "Failed to update task!",
            status: 400,
          },
          null
        );
      } else {
        result(null, res);
      }
    }
  );
};

Task.delete = function (id, result) {
  dbConn.query("DELETE FROM tasks WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(
        {
          error: true,
          message: err?.sqlMessage ?? "Failed to delete task!",
          status: 400,
        },
        null
      );
    } else {
      result(null, res);
    }
  });
};

module.exports = Task;
