// controllers/subscriptionController.js
const asyncHandler = require("express-async-handler");
const PricingPlan = require("../models/PricingPlan");
const Admin = require("../models/Admin");

exports.subscribePlan = asyncHandler(async (req, res) => {
    const { adminId, planId } = req.body;
    // console.log("Request body:", req.body);

    if (!adminId || !planId) {
        return res.status(400).json({ message: "Society and Plan ID required" });
    }

    const plan = await PricingPlan.findById(planId);
    if (!plan) {
        return res.status(404).json({ message: "Plan not found" });
    }

    const society = await Admin.findById(adminId);
    if (!society) {
        return res.status(404).json({ message: "Society not found" });
    }

    const updatedSociety = await Admin.findByIdAndUpdate(
        adminId,
        { subscriptionPlan: planId },
        { new: true } // This returns the updated document
    );

    res.status(200).json({ message: "Plan subscribed successfully", society: updatedSociety });

});
