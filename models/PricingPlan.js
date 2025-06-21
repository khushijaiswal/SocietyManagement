// models/PricingPlan.js
const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['Free', 'Pro', 'ProPlus', 'Gold'],
    },
    price: {
        type: Number,
        required: true,
        default: 0, // Free plan
    },
    billingCycle: {
        type: String,
        enum: ['monthly', 'yearly'],
        default: 'monthly',
    },
    currency: {
        type: String,
        default: 'INR',
    },
    description: {
        type: String,
        required: true,
    },
    features: [{
        type: String,
    }],
    // unavailable: [{
    //     type: String,
    // }],
    maxResidents: {
        type: Number,
        default: 25, // For Free plan
    },
    // storageLimitMB: {
    //     type: Number,
    //     default: 500,
    // },
    isActive: {
        type: Boolean,
        default: true,
    },

}, { timestamps: true });


module.exports = mongoose.model('PricingPlan', pricingPlanSchema);