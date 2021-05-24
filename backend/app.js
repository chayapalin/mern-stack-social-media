const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

// connect to db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// get notified if we connect successfully or if a connection error occurs
mongoose.connection.on("error", err => {
  console.log(`DB connection error: ${err.message}`);
});
mongoose.connection.once("open", function () {
  console.log("We're connected!");
});

// import routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// api docs
app.get("/", (req, res) => {
  fs.readFile("docs/apiDocs.json", (err, data) => {
    if (err) {
      res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    res.json(docs);
  });
});

// middlewares
app.use(morgan("dev"));
app.use(express.json()); // used to parse JSON bodies
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: "Unauthorized!" });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});