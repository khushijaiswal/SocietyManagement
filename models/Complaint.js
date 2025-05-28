const mongoose = require('mongoose');
const complaintSchema = new mongoose.Schema({
    reason: {
        type: String,

        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'resolved'],
        default: 'open'
    },
    resident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        // required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('Complaint', complaintSchema);