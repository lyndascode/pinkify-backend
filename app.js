// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


const concertRoutes = require("./routes/concert.routes");
app.use("/api/concerts", concertRoutes);

app.use("/api/users", require("./routes/user.routes"));

app.use("/api/artists", require("./routes/artists.routes"));

const favoriteRoutes = require("./routes/favorites.routes");
app.use("/api/favorites", favoriteRoutes);

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to Pinkify API 🎤" });
});

// Optionally for UptimeRobot
app.get("/health", (req, res) => {
    res.status(200).json({ message: "API is healthy" });
});

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
