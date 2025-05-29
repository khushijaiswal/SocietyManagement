const asyncHandler = require("express-async-handler");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Resident = require("../models/Resident");
const Complaint = require("../models/Complaint");
const Visitor = require("../models/Visitor");
const Security = require("../models/Security");
const Amenities = require("../models/Amenities");
const Booking = require("../models/Booking");
const Notice = require("../models/Notice");
const MaintenanceSetting = require("../models/MaintenanceSetting");
const Maintenance = require("../models/Maintenance");
const { upload } = require("../utils/upload");
const cloud = require("../utils/cloudinary");
const PricingPlan = require("../models/PricingPlan");


exports.registerResident = asyncHandler(async (req, res) => {

    const { name, email, password, phone, address, flatNumber } = req.body;
    if (!name || !email || !password || !phone || !address || !flatNumber) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Validate email and phone
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    // Check if resident already exists
    const existingResident = await Resident.findOne({ $or: [{ email }, { phone }] });
    if (existingResident) {
        return res.status(400).json({ message: "Resident already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(req.adminId)
    // Create new resident
    const newResident = await Resident.create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
        flatNumber,
        adminId: req.adminId
    });

    return res.status(201).json({ message: "Resident registered successfully", newResident });
}

);

exports.registerSecurity = asyncHandler(async (req, res) => {
    const { name, email, phone, shift, assignedArea, dateOfJoining } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Validate email and phone
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    // Check if security already exists
    const existingSecurity = await Security.findOne({ $or: [{ email }, { phone }] });
    if (existingSecurity) {
        return res.status(400).json({ message: "Security already exists" });
    }

    // Create new security
    // const newSecurity = await Security.create({
    //     name,
    //     email,
    //     phone,
    //     shift,
    //     assignedArea,
    //     dateOfJoining,
    //     isActive: true,
    // });

    const newSecurit = await Security.create(req.body)
    return res.status(201).json({ message: "Security registered successfully", newSecurity });
}

);

// get all residents

exports.getAllResidents = asyncHandler(async (req, res) => {
    try {
        console.log("req.user", req.adminId);
        const residents = await Resident.find({ adminId: req.adminId }).select("-password -__v")
        return res.status(200).json({ message: "All residents fetched successfully", residents });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching residents", error });
    }
}
);

// get all complaints
exports.getAllComplaints = asyncHandler(async (req, res) => {
    try {
        const complaints = await Complaint.find({ adminId: req.user })
            .sort({ createdAt: -1 })
            .populate("resident", "name email phone flatNumber")
        return res.status(200).json({ message: "All complaints fetched successfully", complaints });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching complaints", error });
    }
}
);

// get all security
exports.getAllSecurity = asyncHandler(async (req, res) => {
    try {
        const security = await security.find().select("-password -__v")
        return res.status(200).json({ message: "All security fetched successfully", security });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching security", error });
    }
}
);

// get all visitors
exports.getAllVisitors = asyncHandler(async (req, res) => {
    try {
        const visitors = await Visitor.find().select("-__v")
        return res.status(200).json({ message: "All visitors fetched successfully", visitors });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching visitors", error });
    }
}
);

// update stauts of complaint
exports.updateCompliantStatus = asyncHandler(async (req, res) => {
    const { cid } = req.params
    const { status } = req.body
    if (!cid || !status) {
        return res.status(400).json({ message: "Please provide complaint id and status" })
    }
    const complaint = await Complaint.findByIdAndUpdate(cid, { status }, { new: true })
    if (!complaint) {
        return res.status(404).json({ message: "Complaint not found" })
    }

    // Prevent reverting from resolved to other statuses
    if (complaint.status === 'resolved' && status !== 'resolved') {
        return res.status(400).json({ message: "Cannot change status once resolved" });
    }
    // complaint.status = status
    // await complaint.save()
    return res.status(200).json({ message: "Complaint status updated successfully", complaint })
})




// amenities
exports.addAmenities = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Error uploading image" });
        }
        const { name, description, location, bookingFee } = req.body;
        if (!name || !description || !location || !bookingFee) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        // Validate booking fee
        if (isNaN(bookingFee) || bookingFee <= 0) {
            return res.status(400).json({ message: "Invalid booking fee" });
        }

        // Upload image to cloudinary
        const result = await cloud.uploader.upload(req.file.path);
        const amenities = await Amenities.create({
            name,
            description,
            location,
            bookingFee,
            image: result.secure_url
        })
        return res.status(201).json({ message: "Amenities added successfully", amenities })
    })
});


// view amenitites requests
exports.viewAmenitiesBookings = asyncHandler(async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('resident', 'name')
            .populate('amenity', 'name')
            .sort({ createdAt: -1 });
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found" });
        }
        return res.status(200).json({ message: "Bookings fetched successfully", bookings });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
}
);


// update amenities status
exports.updateAmenitiesStatus = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const { status } = req.body
    if (!bid || !status) {
        return res.status(400).json({ message: "Please provide booking id and status" })
    }
    const booking = await Booking.findByIdAndUpdate(bid, { status }, { new: true })
    if (!booking) {
        return res.status(404).json({ message: "Complaint not found" })
    }


    return res.status(200).json({ message: "Complaint status updated successfully", booking })
})

// Block unblock resident

exports.adminBlockUnblockResident = async (req, res) => {
    try {
        await Resident.findByIdAndUpdate(req.params.rid, { isActive: req.body.isActive }, { new: true })
        res.json({ message: "Resident Account block success" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }
}

// delete resident

exports.deleteResident = async (req, res) => {
    try {
        await Resident.findByIdAndDelete(req.params.rid)
        res.json({ message: "Resident Account delete success" })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "something went wrong" })
    }
}

// update resident

// Backend Update Route
exports.updateResident = async (req, res) => {
    const { rid } = req.params;
    const { name, email, phone, address, flatNumber, isActive } = req.body.updateData;
    try {
        const updatedResident = await Resident.findByIdAndUpdate(
            rid,
            { name, email, phone, address, flatNumber, isActive },
            { new: true }
        );
        if (!updatedResident) {
            return res.status(404).json({ message: "Resident not found" });
        }
        res.json(updatedResident);
    } catch (error) {
        console.error("Update Error:", error);
        res.status(400).json({ message: "Something went wrong" });
    }
};

// Create notice
exports.CreateNotice = asyncHandler(async (req, res) => {
    const { title, description, dateIssued, resident } = req.body
    if (!title || !description || !dateIssued) {
        return res.status(400).json({ message: "Please fill all fields" })
    }
    const notice = await Notice.create({
        title,
        description,
        dateIssued,
        resident: resident || null
    })

    return res.status(201).json({ message: "Notice created successfully", notice })
})


// set maintenance setting
exports.setMaintenanceSetting = asyncHandler(async (req, res) => {
    const { amount, month, year, frequency } = req.body
    if (!amount || !month || !year || !frequency) {
        return res.status(400).json({ message: "Please fill all fields" })
    }
    const setting = await MaintenanceSetting.create({
        amount,
        month,
        year,
        frequency
    })

    return res.status(201).json({ message: "Maintenance setting created successfully", setting })
})


exports.viewAllMaintenancePayments = asyncHandler(async (req, res) => {
    try {
        const payments = await Maintenance.find().populate('residentId', 'name email phone flatNumber')
            .sort({ createdAt: -1 });
        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: "No payments found" });
        }
        return res.status(200).json({ message: "Payments fetched successfully", payments });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching payments", error: error.message });
    }
}
);


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



