"use strict";
const Task = require("../models/tasks.model");
const UploadController = require("./upload.controller");
const crypto = require("crypto");
const moment = require("moment");

exports.findAll = function (req, res) {
  Task.findAll(function (err, task) {
    if (err) res.status(err?.status ?? 400).send(err);
    console.log("Find ALL", task);
    res.send(task);
  });
};

exports.create = function (req, res) {
  const newTask = new Task(req.body);

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Task.create(
      {
        ...newTask,
        id: crypto.randomUUID(),
        dateTime: moment().valueOf(),
      },
      function (err, task) {
        if (err) res.status(err?.status ?? 400).send(err);
        res.json({
          error: false,
          message: "Task added successfully!",
          data: task,
        });
      }
    );
  }
};

exports.findById = function (req, res) {
  Task.findById(req.params.id, function (err, task) {
    if (err) res.status(err?.status ?? 400).send(err);
    else res.json(task);
  });
};

exports.update = function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Task.update(req.params.id, new Task(req.body), function (err, task) {
      if (err) res.status(err?.status ?? 400).send(err);
      res.json({ error: false, message: "Task successfully updated" });
    });
  }
};

exports.delete = async function (req, res) {
  try {
    const taskId = req.params.id;

    Task.findById(taskId, async function (err, task) {
      if (err) {
        res.status(err?.status ?? 400).send(err);
      } else {
        if (!task) {
          return res
            .status(404)
            .json({ error: true, message: "Task not found!" });
        }

        Task.delete(taskId, async function (deleteErr, deleteResult) {
          if (deleteErr) {
            res.status(deleteErr?.status ?? 400).send(deleteErr);
          } else {
            // Delete the associated image
            if (task.image) {
              await UploadController.deleteUploadedFile(task.image);
            }

            res.json({
              error: false,
              message: "Task and associated image successfully deleted",
            });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res
      .status(error?.status ?? 400)
      .json({ error: true, message: "Failed to delete task!" });
  }
};
