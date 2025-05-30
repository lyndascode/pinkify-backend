const express = require("express");
const Concert = require("../models/Concert.model");
const router = express.Router();
const { isAuthenticated } = require("../middleware/jwt.middleware");


// GET the Concerts List
router.get("/", (req, res, next) => {

    Concert.find()
        .then((concerts) => {
            if (concerts.length === 0) {
                return res.status(404).json({ message: "There are no concerts now." });
            }
            res.status(200).json(concerts);
        })
        .catch((err) => {
            console.log("Error fetching concerts");
            res.status(500).json({ message: "Err fetching concerts" });
        })

});


//GET ID

router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    Concert.findById(id)
        .then((concerts) => {
            if (!concerts) {
                return res.status(404).json({ message: "Concert not found." });
            }
            res.status(200).json(concerts);
        })
        .catch((err) => {
            console.log("Error fetching concerts by Id ");
            res.status(500).json({ message: "Err fetching concerts" });
        })

});

//POST Create Concerts

router.post("/", (req, res, next) => {
    const concertData = req.body;
    console.log("Creating concert with data:", concertData);

    Concert.create(concertData)
        .then((createdConcert) => { res.status(201).json(createdConcert); })
        .catch((err) => {
            console.log("Error creating concerts");
            res.status(500).json({ message: "Err creating concerts" });
        })

})


//UPDATE ROUTE :

router.put("/:id", isAuthenticated, (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    Concert.findByIdAndUpdate(id, updatedData, { new: true })
        .then((updatedConcert) => {
            if (!updatedConcert) {
                return res.status(404).json({ message: "Concert not found." });
            }
            res.status(200).json(updatedConcert);
        })
        .catch((err) => {
            console.log("Error updating concert", err);
            res.status(500).json({ message: "Error updating concert" });
        });
});

//DELETE ROUTE

router.delete('/:id', isAuthenticated, (req, res, next) => {
    const { id } = req.params;
    Concert.findByIdAndDelete(id)
        .then((deletedConcert) => { res.status(200).json({ message: "Concert deleted", deletedConcert }) })
        .catch((err) => { res.status(500).json({ message: "Error deleting concert", err }) })
})




module.exports = router;
