const mongoose = require('mongoose');
const residentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    flatNumber: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Resident', residentSchema);
