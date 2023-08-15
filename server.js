const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const whitelist = ["https://tasks-react-app.onrender.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error());
    }
  },
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Welcome to Task Listing Backend APP - created By Abdul Jaleel");
});

// routes
const taskRoutes = require("./src/routes/tasks.routes");
const uploadRoutes = require("./src/routes/upload.routes");

// using as middleware
app.use("/api/task", taskRoutes);
app.use("/api/upload", uploadRoutes);

app.use("/api/images", express.static("./src/upload"));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
