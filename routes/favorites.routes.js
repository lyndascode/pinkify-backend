const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// Add Concert to Favorites
router.post("/concerts/:concertId", isAuthenticated, (req, res) => {
    const { concertId } = req.params;

    User.findByIdAndUpdate(
        req.payload._id,
        { $addToSet: { favorites: concertId } },
        { new: true }
    )
        .populate("favorites")
        .then((user) => res.status(200).json(user))
        .catch((err) => {
            console.log("Error adding concert to favorites", err);
            res.status(500).json({ message: "Failed to add favorite concert" });
        });
});

// Remove Concert from Favorites
router.delete("/concerts/:concertId", isAuthenticated, (req, res) => {
    const { concertId } = req.params;

    User.findByIdAndUpdate(
        req.payload._id,
        { $pull: { favorites: concertId } },
        { new: true }
    )
        .populate("favorites")
        .then((user) => res.status(200).json(user))
        .catch((err) => {
            console.log("Error removing concert from favorites", err);
            res.status(500).json({ message: "Failed to remove favorite concert" });
        });
});

// Add Artist to Favorites
router.post("/artists/:artistId", isAuthenticated, (req, res) => {
    const { artistId } = req.params;

    User.findByIdAndUpdate(
        req.payload._id,
        { $addToSet: { favoriteArtists: artistId } },
        { new: true }
    )
        .populate("favoriteArtists")
        .then((user) => res.status(200).json(user))
        .catch((err) => {
            console.log("Error adding artist to favorites", err);
            res.status(500).json({ message: "Failed to add favorite artist" });
        });
});

// Remove Artist from Favorites
router.delete("/artists/:artistId", isAuthenticated, (req, res) => {
    const { artistId } = req.params;

    User.findByIdAndUpdate(
        req.payload._id,
        { $pull: { favoriteArtists: artistId } },
        { new: true }
    )
        .populate("favoriteArtists")
        .then((user) => res.status(200).json(user))
        .catch((err) => {
            console.log("Error removing artist from favorites", err);
            res.status(500).json({ message: "Failed to remove favorite artist" });
        });
});

module.exports = router;
