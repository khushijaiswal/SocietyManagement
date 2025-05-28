const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const validator = require("validator");
const PricingPlan = require("../models/PricingPlan");


// get all admins    
exports.fetchAdmin = asyncHandler(async (req, res) => {
    const admins = await Admin.find();
    return res.status(200).json({ message: "All admins fetched successfully", admins });
}
);

// plans  

exports.createPlan = asyncHandler(async (req, res) => {
    const { name, price, billingCycle, currency, description, features, maxResidents } = req.body;

    // Validate the input
    if (!name || !price || !billingCycle || !description || !features || !maxResidents) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Check if the plan already exists
    const existingPlan = await PricingPlan.findOne({ name });
    if (existingPlan) {
        return res.status(400).json({ message: "Plan already exists" });
    }

    // Create a new plan
    const newPlan = new PricingPlan({
        name,
        price,
        billingCycle,
        currency,
        description,
        features,
        maxResidents,
    });

    await newPlan.save();

    return res.status(201).json({ message: "Plan created successfully", plan: newPlan });
});

// exports.updatePlan = asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { name, price, billingCycle, currency, description, features, maxResidents } = req.body;

//     // Validate the input
//     if (!name || !price || !billingCycle || !description || !features || !maxResidents) {
//         return res.status(400).json({ message: "Please fill all the fields" });
//     }

//     // Check if the plan exists
//     const existingPlan = await PricingPlan.findById(id);
//     if (!existingPlan) {
//         return res.status(404).json({ message: "Plan not found" });
//     }
//     // Update the plan
//     existingPlan.name = name;
//     existingPlan.price = price;
//     existingPlan.billingCycle = billingCycle;
//     existingPlan.currency = currency;
//     existingPlan.description = description;
//     existingPlan.features = features;
//     existingPlan.maxResidents = existingPlan.maxResidents;
//     await existingPlan.save();
//     return res.status(200).json({ message: "Plan updated successfully", plan: existingPlan });
// }
// );
// exports.deletePlan = asyncHandler(async (req, res) => {
//     const { id } = req.params;

//     // Check if the plan exists
//     const existingPlan = await PricingPlan.findById(id);
//     if (!existingPlan) {
//         return res.status(404).json({ message: "Plan not found" });
//     }

//     // Delete the plan
//     await existingPlan.remove();

//     return res.status(200).json({ message: "Plan deleted successfully" });
// }
// );


// exports.getPlans = asyncHandler(async (req, res) => {
//     const plans = await PricingPlan.find();
//     return res.status(200).json({ message: "Plans fetched successfully", plans });
// }
// );
