const mongoose = require('mongoose');
const { Schema } = mongoose;

const visitorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    flatNumber: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    dateIn: {
        type: Date,
        default: Date.now
    },
    dateOut: {
        type: Date,
        default: null
    },
    vehicle: {
        type: String
    },
    // residentId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Resident',
    //     required: true
    // },
    guardId: {
        type: Schema.Types.ObjectId,
        ref: 'Security',
        // required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Visitor', visitorSchema);