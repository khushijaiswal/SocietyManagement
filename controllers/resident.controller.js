const asyncHandler = require("express-async-handler");
const Complaint = require("../models/Complaint");
const Amenities = require("../models/Amenities");
const Security = require("../models/Security");
const Visitor = require("../models/Visitor");
const Notice = require("../models/Notice");
const Maintenance = require("../models/Maintenance");
const Booking = require("../models/Booking");
const MaintenanceSetting = require("../models/MaintenanceSetting");

exports.raiseComplaint = asyncHandler(async (req, res) => {
    const { reason, description } = req.body;
    // console.log(req.user._id);
    // Validate input
    if (!reason || !description) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    // Create new complaint
    const newComplaint = await Complaint.create({
        reason,
        description,
        status: "open",
        resident: req.user,
    });

    return res.status(201).json({ message: "Complaint raised successfully", newComplaint });
}
);

exports.viewComplaints = asyncHandler(async (req, res) => {
    try {
        const complaints = await Complaint.find({ resident: req.user })
        if (!complaints || complaints.length === 0) {
            return res.status(404).json({ message: "No complaints found" });
        }
        return res.status(200).json({ message: "Complaints fetched successfully", complaints });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching complaints", error: error.message });
    }
}
);

exports.getActiveMaintenanceSetting = asyncHandler(async (req, res) => {
    const setting = await MaintenanceSetting.findOne({ status: 'active' });

    if (!setting) {
        return res.status(404).json({ message: "No active maintenance setting found" });
    }

    return res.status(200).json({ setting });
});

exports.maintenancePayment = asyncHandler(async (req, res) => {
    const { amount, month, year, paymentMethod, transactionId, status } = req.body;

    // Validate input
    if (!amount || !month || !year || !paymentMethod) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    // Optional: check for duplicate payment
    const existingPayment = await Maintenance.findOne({
        residentId: req.user,
        month,
        year
    });

    if (existingPayment) {
        return res.status(400).json({ message: "Payment for this month already exists" });
    }

    // Create new payment
    const newPayment = await Maintenance.create({
        residentId: req.user,
        amount,
        month,
        year,
        paymentMethod,
        transactionId,
        status: status || "paid",
    });

    return res.status(201).json({
        message: "Payment recorded successfully",
        data: newPayment
    });
});

exports.viewMaintenancePayments = asyncHandler(async (req, res) => {
    try {
        const payments = await Maintenance.find({ residentId: req.user });
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

// view public notices
exports.viewNotices = asyncHandler(async (req, res) => {
    try {
        const notices = await Notice.find({ resident: null })
        if (!notices || notices.length === 0) {
            return res.status(404).json({ message: "No notices found" });
        }
        return res.status(200).json({ message: "Notices fetched successfully", notices });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching notices", error: error.message });
    }
}
);

// view notice for logged in resident
exports.viewNoticeForLoggedInResident = asyncHandler(async (req, res) => {
    try {
        const notices = await Notice.find({ resident: req.user }).populate("resident", "name");
        if (!notices || notices.length === 0) {
            return res.status(404).json({ message: "No notices found" });
        }
        return res.status(200).json({ message: "Notices fetched successfully", notices });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching notices", error: error.message });

    }
});

exports.viewVisitors = asyncHandler(async (req, res) => {
    try {
        const visitors = await Visitor.find();
        if (!visitors || visitors.length === 0) {
            return res.status(404).json({ message: "No visitors found" });
        }
        return res.status(200).json({ message: "Visitors fetched successfully", visitors });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching visitors", error: error.message });
    }
}
);
exports.viewSecurity = asyncHandler(async (req, res) => {
    try {
        const security = await Security.find();
        if (!security || security.length === 0) {
            return res.status(404).json({ message: "No security found" });
        }
        return res.status(200).json({ message: "Security fetched successfully", security });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching security", error: error.message });
    }
}
);

exports.viewAmenities = asyncHandler(async (req, res) => {
    try {
        const amenities = await Amenities.find();
        if (!amenities || amenities.length === 0) {
            return res.status(404).json({ message: "No amenities found" });
        }
        return res.status(200).json({ message: "Amenities fetched successfully", amenities });
    }
    catch (error) {
        return res.status(500).json({ message: "Error fetching amenities", error: error.message });
    }
}
);

exports.bookAmenities = asyncHandler(async (req, res) => {
    const { aid } = req.params;
    const { bookingDate, startTime, endTime } = req.body;

    console.log("aid from params:", req.params.aid);
    console.log("user from auth:", req.user);

    // Validate input
    if (!bookingDate || !startTime || !endTime) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    // Create new booking
    const newBooking = await Booking.create({
        amenity: aid,
        resident: req.user,
        bookingDate,
        startTime,
        endTime
    });

    return res.status(201).json({ message: "Amenities booked successfully", newBooking });
}
);
exports.viewBookings = asyncHandler(async (req, res) => {
    try {
        const bookings = await Amenities.find({ resident: req.user }).populate('amenity', 'name description location bookingFee');
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
