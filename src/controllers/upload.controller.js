const fs = require("fs");
const path = require("path");

const handleFileUpload = (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      error: true,
      message: "No file uploaded",
    });
  }

  var file = __dirname + "/../upload/" + req.file.originalname;

  fs.rename(req.file.path, file, function (err) {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: true,
        message: "Failed to upload file!",
        status: 400,
      });
    } else {
      res.json({
        message: "File uploaded successfully",
        filename: req.file.originalname,
      });
    }
  });
};

const deleteUploadedFile = (filename) => {
  return new Promise((resolve, reject) => {
    const filePath = __dirname + "/../upload/" + filename;

    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  handleFileUpload,
  deleteUploadedFile,
};
