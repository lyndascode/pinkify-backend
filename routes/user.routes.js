const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /api/users/me → get logged-in user's full info
router.get("/me", isAuthenticated, (req, res) => {
    User.findById(req.payload._id)
        .populate("favourites")
        .populate("favoriteArtists")
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(404).json({ message: "User not found." });
            }

            res.status(200).json(foundUser);
        })
        .catch((err) => {
            console.log("Error fetching user by ID:", err);
            res.status(500).json({ message: "Failed to fetch user data." });
        });
});

// GET /api/users/:id → (optional) get user by ID (only for admin use?)
router.get("/:id", isAuthenticated, (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .select("-password")
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.log("Error fetching user by ID", err);
            res.status(500).json({ message: "Server error" });
        });
});

// GET /api/users list all users   maybe protect with isAdmin later
router.get("/", isAuthenticated, (req, res) => {
    User.find()
        .select("-password")
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            console.log("Error fetching users", err);
            res.status(500).json({ message: "Server error" });
        });
});

// GET /api/users/favorites/concerts
router.get("/favorites/concerts", isAuthenticated, (req, res) => {
    User.findById(req.payload._id)
        .populate("favourites")
        .then((user) => {
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user.favourites);
        })
        .catch((err) => {
            console.error("Error getting favorite concerts", err);
            res.status(500).json({ message: "Server error" });
        });
});

// GET /api/users/favorites/artists
router.get("/favorites/artists", isAuthenticated, (req, res) => {
    User.findById(req.payload._id)
        .populate("favoriteArtists")
        .then((user) => {
            if (!user) return res.status(404).json({ message: "User not found" });
            res.json(user.favoriteArtists);
        })
        .catch((err) => {
            console.error("Error getting favorite artists", err);
            res.status(500).json({ message: "Server error" });
        });
});
// ADD concert to favorites
router.post("/favorites/concerts/:concertId", isAuthenticated, (req, res) => {
    const userId = req.payload._id;
    const concertId = req.params.concertId;

    User.findByIdAndUpdate(
        userId,
        { $addToSet: { favourites: concertId } }, // addToSet avoids duplicates
        { new: true }
    )
        .populate("favourites")
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err => {
            console.log("Error adding concert to favorites:", err);
            res.status(500).json({ message: "Failed to add concert to favorites" });
        });
});

module.exports = router;

