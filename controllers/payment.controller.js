// controllers/paymentController.js
const Razorpay = require('razorpay');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');
const Maintenance = require('../models/Maintenance');
const Admin = require('../models/Admin');
const PricingPlan = require('../models/PricingPlan');

exports.initiatePayment = asyncHandler(async (req, res) => {
    const { amount, month, year } = req.body;

    if (!amount || !month || !year) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    console.log("key", process.env.RAZORPAY_API_KEY);
    console.log("secret", process.env.RAZORPAY_SCERET_KEY);


    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_SCERET_KEY,
    });

    const options = {
        amount: amount * 100, // in paise
        currency: 'INR',
        receipt: `receipt_${Math.floor(Math.random() * 1000000)}`,
        notes: { month, year }
    };

    try {
        const order = await instance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ message: 'Unable to initiate payment' });
    }
});


exports.verifyAndSavePayment = asyncHandler(async (req, res) => {

    const {
        amount,
        month,
        year,
        frequency,
        paymentMethod,
        transactionId,
        razorpay_order_id,
        razorpay_signature,
    } = req.body;

    console.log('req.body', req.body);


    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SCERET_KEY)
        .update(`${razorpay_order_id}|${transactionId}`)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature from Razorpay" });
    }
    // console.log("razorpay_signature", razorpay_signature);
    // console.log("razorpay_order_id", razorpay_order_id,);
    // console.log("transactionId", transactionId);



    const newPayment = await Maintenance.create({
        residentId: req.user,
        amount,
        month,
        year,
        frequency,
        paymentMethod,
        transactionId,
        status: "paid",
        datePaid: new Date(),
    });

    res.status(201).json({ message: 'Payment recorded successfully', newPayment });
});

exports.initiateSubscriptionPayment = asyncHandler(async (req, res) => {
    const { adminId, planId } = req.body;

    if (!adminId || !planId) {
        return res.status(400).json({ message: 'Admin and Plan ID are required' });
    }

    const plan = await PricingPlan.findById(planId);
    if (!plan) {
        return res.status(404).json({ message: 'Plan not found' });
    }

    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_API_KEY,
        key_secret: process.env.RAZORPAY_SCERET_KEY,
    });

    const options = {
        amount: plan.price * 100,
        currency: 'INR',
        receipt: `subscription_${Math.floor(Math.random() * 1000000)}`,
        notes: { planName: plan.name }
    };

    try {
        const order = await instance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Unable to initiate subscription payment' });
    }
});

// // ✅ NEW: VERIFY & SAVE SUBSCRIPTION PAYMENT
exports.verifyAndSaveSubscription = asyncHandler(async (req, res) => {
    const {
        adminId,
        planId,
        transactionId,
        razorpay_order_id,
        razorpay_signature
    } = req.body;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SCERET_KEY)
        .update(`${razorpay_order_id}|${transactionId}`)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ message: "Invalid signature from Razorpay" });
    }

    // Update admin with subscribed plan
    const updatedAdmin = await Admin.findByIdAndUpdate(
        adminId,
        {
            subscriptionPlan: planId,
            subscriptionStatus: "active",
            subscriptionPaidAt: new Date(),
        },
        { new: true }
    );

    res.status(200).json({
        message: "Subscription successful and verified",
        success: true,
        admin: updatedAdmin
    });
});