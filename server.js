const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to Task Listing Backend APP - created By Abdul Jaleel");
});

// Require tasks routes
const taskRoutes = require("./src/routes/tasks.routes");

// using as middleware
app.use("/api/task", taskRoutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
