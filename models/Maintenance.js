const mongoose = require('mongoose');
const { Schema } = mongoose;


const maintenanceSchema = new Schema({
    residentId: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
        required: true
    },
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
    status: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: 'unpaid'
    },
    datePaid: {
        type: Date,
        default: Date.now
    },
    paymentMethod: {
        type: String,
        enum: ['online'],
    },
    transactionId: {
        type: String,
        default: null
    },

}, {
    timestamps: true
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);