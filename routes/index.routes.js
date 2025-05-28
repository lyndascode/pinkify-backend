const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//  for UptimeRobot
router.get('/health', (req, res) => {
  // send ping to prevent inactivity on mongodb atlas
  mongoose.connection.db.admin().ping()
    .then(() => {
      res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
      });
    })
    .catch(err => {
      console.error('MongoDB ping failed:', err);
      res.status(500).json({
        status: 'error',
        message: 'Failed to connect to MongoDB',
      });
    });
});

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
