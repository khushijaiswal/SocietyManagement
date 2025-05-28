const mongoose = require('mongoose');


const BookingSchema = new mongoose.Schema({
    amenity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Amenities',
        required: true
    },
    resident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
    bookingDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);

