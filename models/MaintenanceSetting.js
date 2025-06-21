const mongoose = require('mongoose');

const MaintenanceSettingSchema = new mongoose.Schema({
    monthlyRate: {
        type: Number,
        required: true,
    },
    yearlyRate: {
        type: Number,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
}, { timestamps: true });
module.exports = mongoose.model('MaintenanceSetting', MaintenanceSettingSchema);