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
        type: String,
        required: true,
    },
}, { timestamps: true });
module.exports = mongoose.model('MaintenanceSetting', MaintenanceSettingSchema);