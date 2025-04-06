const mongoose = require('mongoose');

const SubServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    }
});

const ServiceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    subServices: [SubServiceSchema] // Embed sub-services as an array
}, {
    timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
