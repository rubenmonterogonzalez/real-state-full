const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
    transactionType: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    propertyType: {
        type: String,
        required: false,
    },
    bedrooms: {
        type: Number,
        required: false,
    },
    bathrooms: {
        type: Number,
        required: false,
    },
    kitchen: {
        type: String,
        default: false,
    },
    entrance: {
        type: String,
        default: false,
    },
    yearBuilt: {
        type: Number,
        required: false,
    },
    price: {
        type: Number,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    images: {
        type: String,
        required: false,
    },
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;