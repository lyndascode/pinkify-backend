const { Schema, model } = require("mongoose");
const concertSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    date: {
        type: Date,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },

    artists: [{
        type: Schema.Types.ObjectId,
        ref: "Artist",
    }],

    image: {
        type: String, // URL of the concert poster
    },

    price: {
        type: Number,
        required: true,
    },

    capacity: {
        type: Number,
        required: true,
    },

    ticketsSold: {
        type: Number,
        default: 0,
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User", // admin user
    },
});


const Concert = model("Concert", concertSchema);
module.exports = Concert;
