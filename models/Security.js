const mongoose = require('mongoose');

const securitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: { type: String },
    otpSendOn: { type: Date },
    phone: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    shift: {
        type: String,
        enum: ['morning', 'afternoon', 'night'],
        required: true
    },
    assignedArea: {
        type: String,
        required: true
    },
    dateOfJoining: {
        type: Date,
        default: Date.now
    },
    dateOfLeaving: {
        type: Date,
        default: null
    },

}, {
    timestamps: true
});


const Security = mongoose.models.Security || mongoose.model('Security', securitySchema);

module.exports = Security;