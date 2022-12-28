// import
require("dotenv").config();

const cors = require("cors");
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const router = express.Router();
const { PORT, CLIENT_URL, DB_URL, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } =
  process.env;

const db = require("./src/config/db")(mongoose, DB_URL);
const Novel = require("./src/models/NovelModel")(mongoose);
const User = require("./src/models/UserModel")(mongoose);
const History = require("./src/models/HistoryModel")(mongoose);

const NovelRoute = require("./src/routes/NovelRoute")(
  Novel,
  router,
  path,
  ACCESS_TOKEN_SECRET
);
const UserRoute = require("./src/routes/UserRoute")(
  User,
  router,
  path,
  ACCESS_TOKEN_SECRET
);
const AuthRoute = require("./src/routes/AuthRoute")(
  User,
  History,
  router,
  path,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET
);

// module setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  cors({
    origin: [CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// cookie setup
app.use(cookieParser());

// route path
app.use("/novel", NovelRoute);
app.use("/user", UserRoute);
app.use("/auth", AuthRoute);
app.use("*", (req, res) => res.status(404).json({ message: "URL not found!" }));

// watermark
console.clear();
console.info(`
░█░░░▀█▀░▀█▀░█▀▀░░░█▀█░█▀█░█░█░█▀▀░█░░
░█░░░░█░░░█░░█▀▀░░░█░█░█░█░▀▄▀░█▀▀░█░░
░▀▀▀░▀▀▀░░▀░░▀▀▀░░░▀░▀░▀▀▀░░▀░░▀▀▀░▀▀▀
`);

// run server
app.listen(PORT, () => console.info(`Server up and running on :${PORT}...`));

// db connect
db.on("error", (err) => console.error(err));
db.once("open", () => console.info("Database Connected..."));
