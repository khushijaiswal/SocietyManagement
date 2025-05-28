const asyncHandler = require("express-async-handler");
const PricingPlan = require("../models/PricingPlan");




// get all plans
exports.getAllPlans = asyncHandler(async (req, res) => {
    try {
        const plans = await PricingPlan.find().sort({ createdAt: -1 });
        if (!plans || plans.length === 0) {
            return res.status(404).json({ message: "No plans found" });
        }
        return res.status(200).json({ message: "Plans fetched successfully", plans });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching plans", error: error.message });
    }
}
);