// import
const path = require("path");
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv").config();
const db = require("./src/config/db")(mongoose, env);
const UserRoute = require("./src/routes/UserRoute")(mongoose, express, path);
const NovelRoute = require("./src/routes/NovelRoute")(mongoose, express, path);

// module init
const app = express();
const { PORT, CLIENT_URL } = process.env;

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

// route path
app.use("/novel", NovelRoute);
app.use("/user", UserRoute);
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
