const asyncHandler = require("express-async-handler");
const Admin = require("../models/Admin");
const validator = require("validator");
const PricingPlan = require("../models/PricingPlan");
const Resident = require("../models/Resident");


// get all admins    
exports.fetchAdmin = asyncHandler(async (req, res) => {
    const admins = await Admin.find();
    return res.status(200).json({ message: "All admins fetched successfully", admins });
}
);

exports.superadminBlockUnblockSociety = async (req, res) => {
    try {
        await Admin.findByIdAndUpdate(req.params.aid, { isActive: req.body.isActive }, { new: true })
        res.json({ message: "Society Account block success" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }
}

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

exports.updatePlan = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, price, billingCycle, currency, description, maxResidents, features } = req.body;
    // Validate the input
    if (!name || !price === undefined || !billingCycle || !features || !description || !maxResidents) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const updatePlan = await PricingPlan.findByIdAndUpdate(
            id,
            {
                name,
                price,
                billingCycle,
                currency,
                description,
                features,
                maxResidents
            },
            { new: true, runValidators: true }
        )
        if (!updatePlan) {
            return res.status(404).json({ message: "Plan not found" });
        }
        res.json(updatePlan)
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Something went wrong" });
    }
}
);

exports.deletePlan = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Check if the plan exists
    const existingPlan = await PricingPlan.findByIdAndDelete(id);
    if (!existingPlan) {
        return res.status(404).json({ message: "Plan not found" });
    }

    try {
        await PricingPlan.findByIdAndDelete(req.params.sid)
        res.json({ message: "Plan delete success" })
    } catch (error) {
        console.log(error)

    }
});

exports.deleteSecurity = async (req, res) => {
    try {
        await Security.findByIdAndDelete(req.params.sid)
        res.json({ message: "Security Account delete success" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }
}

exports.getPlans = asyncHandler(async (req, res) => {
    const plans = await PricingPlan.find();
    return res.status(200).json({ message: "Plans fetched successfully", plans });
}
);

exports.viewSocietyDetails = asyncHandler(async (req, res) => {
    const societyId = req.params.id;

    if (!validator.isMongoId(societyId)) {
        return res.status(400).json({ message: "Invalid society ID" });
    }

    const society = await Admin.findById(societyId).populate('subscriptionPlan');
    if (!society) {
        return res.status(404).json({ message: "Society not found" });
    }

    const residentCount = await Resident.countDocuments({ adminId: societyId });

    return res.status(200).json({
        message: "Society details fetched successfully",
        society,
        residentCount
    });
});
