const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    genre: {
        type: String,
    },

    bio: {
        type: String,
    },

    image: {
        type: String, // Artist photo
    },

    socialLinks: {
        instagram: String,
        youtube: String,
        twitter: String,
        website: String,
    },
});

module.exports = mongoose.model("Artist", artistSchema);
