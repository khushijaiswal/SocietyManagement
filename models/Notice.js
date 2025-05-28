const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateIssued: {
        type: Date,
        default: Date.now
    },
    resident: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resident',
        // required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Notice', NoticeSchema);
