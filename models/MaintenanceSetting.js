const mongoose = require('mongoose');

const MaintenanceSettingSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        enum: ['Monthly', 'Quarterly'],
        default: 'Monthly'
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, { timestamps: true });
module.exports = mongoose.model('MaintenanceSetting', MaintenanceSettingSchema);