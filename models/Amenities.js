const mongoose = require('mongoose');
const { Schema } = mongoose;

const amenitiesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    // availability: {
    //     type: Boolean,
    //     default: true
    // },
    bookingFee: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    // bookingStatus: {
    //     type: String,
    //     enum: ['available', 'booked'],
    //     default: 'available'
    // },

}, {
    timestamps: true
});

module.exports = mongoose.model('Amenities', amenitiesSchema);