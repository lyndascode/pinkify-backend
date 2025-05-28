const express = require("express");
const Artist = require("../models/Artist.model");
const router = express.Router();

// GET all artists
router.get("/", (req, res, next) => {
    Artist.find()
        .then((artists) => {
            if (artists.length === 0) {
                return res.status(404).json({ message: "There are no artists now." });
            }
            res.status(200).json(artists);
        })
        .catch((err) => {
            console.log("Error fetching artists");
            res.status(500).json({ message: "Err fetching artists" });
        });
});

// GET artist by ID
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    Artist.findById(id)
        .then((artist) => {
            if (!artist) {
                return res.status(404).json({ message: "Artist not found." });
            }
            res.status(200).json(artist);
        })
        .catch((err) => {
            console.log("Error fetching artist by ID");
            res.status(500).json({ message: "Err fetching artist" });
        });
});

// POST create artist
router.post("/", (req, res, next) => {
    const artistData = req.body;
    console.log("Creating artist with data:", artistData);

    Artist.create(artistData)
        .then((createdArtist) => res.status(201).json(createdArtist))
        .catch((err) => {
            console.log("Error creating artist:", err);
            res.status(500).json({ message: "Err creating artist" });
        });
});


//DELETE ROUTE

router.delete('/events', (req, res, next) => {
    const { id } = req.body;
    Artist.findByIdAndDelete(id)
        .then((deletedArtist) => { res.status(200).json({ message: "Artist deleted", deletedArtist }) })
        .catch((err) => { res.status(500).json({ message: "Error deleting Artist", err }) })
})

module.exports = router;
