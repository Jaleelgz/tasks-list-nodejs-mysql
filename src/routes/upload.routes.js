const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "src/upload/" });

const uploadController = require("../controllers/upload.controller");

router.post("/", upload.single("file"), uploadController.handleFileUpload);

module.exports = router;
