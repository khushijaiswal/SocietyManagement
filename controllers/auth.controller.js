const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const SuperAdmin = require("../models/SuperAdmin");
const Resident = require("../models/Resident");
const Security = require("../models/Security");
const redisClient = require("./../utils/redisClient");
const validator = require("validator");
const generateOTP = require("../utils/otp")
require("dotenv").config();

// @desc Register a new admin
// @route POST /api/auth/superadmin/register

exports.registerSuperAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Validate email and phone
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
        return res.status(400).json({ message: "Invalid phone number" });
    }
    // Validate password
    // if (!validator.isStrongPassword(password)) {
    //     return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character" });
    // }


    // Check if super admin already exists
    const existingSuperAdmin = await SuperAdmin.findOne({ $or: [{ email }, { phone }] });
    if (existingSuperAdmin) {
        return res.status(400).json({ message: "Super admin already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new super admin
    const newSuperAdmin = await SuperAdmin.create({
        name,
        email,
        password: hashedPassword,
        phone,
    });
    return res.status(201).json({ message: "Super admin registered successfully", newSuperAdmin });
});

// @desc Login super admin
// @route POST /api/auth/superadmin/login

exports.loginSuperAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check if username is email or phone
    const isEmail = validator.isEmail(username);
    const isPhone = validator.isMobilePhone(username, "en-IN");
    if (!isEmail && !isPhone) {
        return res.status(400).json({ message: "Invalid email or phone number" });
    }
    // Find super admin by email or phone
    const superAdmin = await SuperAdmin.findOne({ $or: [{ email: username }, { phone: username }] });
    if (!superAdmin) {
        return res.status(400).json({ message: "Super admin not found. Please check email or phone" });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, superAdmin.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    // Create JWT token
    const token = jwt.sign({ id: superAdmin._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    // Set cookie
    res.cookie("superadmin", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: process.env.MAX_AGE });
    return res.status(200).json({ message: "Super admin logged in successfully", superAdmin });
}
);

// @desc Logout super admin
// @route POST /api/auth/superadmin/logout

exports.logoutSuperAdmin = asyncHandler(async (req, res) => {
    res.cookie("superadmin", "", { httpOnly: true, secure: true, sameSite: "None", maxAge: 0 });
    return res.status(200).json({ message: "Super admin logged out successfully" });
}
);

// api/auth/admin/register
exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, phone, societyName } = req.body;
    if (!name || !email || !password || !phone || !societyName) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Validate email and phone
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email" });
    }
    if (!validator.isMobilePhone(phone, "en-IN")) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ $or: [{ email }, { phone }, { societyName }] });
    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = await Admin.create({
        name,
        email,
        password: hashedPassword,
        phone,
        societyName
    });

    // Create JWT token
    // const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    // console.log("admin token", token);
    // Set cookie
    // res.cookie("admin", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: process.env.MAX_AGE });
    return res.status(201).json({ message: "Admin registered successfully", newAdmin });
});


// @desc Login super admin
// @route POST /api/auth/admin/login

exports.loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check if username is email or phone
    const isEmail = validator.isEmail(username);
    const isPhone = validator.isMobilePhone(username, "en-IN");
    if (!isEmail && !isPhone) {
        return res.status(400).json({ message: "Invalid email or phone number" });
    }
    // Find super admin by email or phone
    const admin = await Admin.findOne({ $or: [{ email: username }, { phone: username }] });
    if (!admin) {
        return res.status(400).json({ message: "Admin not found. Please check email or phone" });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    // Create JWT token
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    // console.log("admin token", token);
    // Set cookie
    res.cookie("admin", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: process.env.MAX_AGE });
    return res.status(200).json({ message: "Admin logged in successfully", admin });
}
);

// @desc Logout super admin
// @route POST /api/auth/superadmin/logout

exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie("admin", "", { httpOnly: true, secure: true, sameSite: "None", maxAge: 0 });
    return res.status(200).json({ message: "Admin logged out successfully" });
}
);

// @desc Register a new resident
// @route POST /api/auth/resident/
exports.loginResident = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    // Check if username is email or phone
    const isEmail = validator.isEmail(username);
    const isPhone = validator.isMobilePhone(username, "en-IN");
    if (!isEmail && !isPhone) {
        return res.status(400).json({ message: "Invalid email or phone number" });
    }
    // Find resident by email or phone
    const resident = await Resident.findOne({ $or: [{ email: username }, { phone: username }] });
    if (!resident) {
        return res.status(400).json({ message: "Resident not found. Please check email or phone" });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, resident.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
    }
    // Create JWT token
    const token = jwt.sign({ id: resident._id }, process.env.JWT_SECRET, { expiresIn: "30d" });
    // console.log("resident token", token);
    // Set cookie
    res.cookie("resident", token, { httpOnly: true, secure: true, sameSite: "None", maxAge: process.env.MAX_AGE });
    return res.status(200).json({ message: "Resident logged in successfully", resident });
}
);

// @desc Logout resident
// @route POST /api/auth/resident/logout

exports.logoutResident = asyncHandler(async (req, res) => {
    res.cookie("resident", "", { httpOnly: true, secure: true, sameSite: "None", maxAge: 0 });
    return res.status(200).json({ message: "Resident logged out successfully" });
}
);

// @desc Login a new security
// @route POST /api/auth/security/login

exports.loginSecurity = asyncHandler(async (req, res) => {
    // console.log(req.body);
    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const isEmail = validator.isEmail(username);
    const isPhone = validator.isMobilePhone(username, "en-IN");

    if (!isEmail && !isPhone) {
        return res.status(400).json({ message: "Invalid email or phone number" });
    }
    // const query = isEmail ? { email: username } : { phone: username };

    const security = await Security.findOne({
        $or: [{ email: username }, { phone: username }]
    });

    if (!security) {
        return res.status(400).json({ message: "Security user not found" });
    }

    const otp = generateOTP();
    await Security.findByIdAndUpdate(security._id, { otp, otpSendOn: Date.now() })
    // const token = jwt.sign({ _id: security._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    // res.cookie('security', token, { httpOnly: true, secure: true, sameSite: "None", maxAge: process.env.MAX_AGE });
    // TODO: send OTP via SMS/Email here
    return res.status(200).json({ message: `OTP sent to ${username}` });
});


// @desc Verify OTP for security login
// @route POST /api/auth/security/verify-otp

exports.verifySecurityOTP = asyncHandler(async (req, res) => {
    const { username, otp } = req.body;

    if (!otp || !username) {
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const security = await Security.findOne({
        $or: [{ email: username }, { phone: username }],
    });

    if (!security) {
        return res.status(400).json({ message: "Security user not found" });
    }

    if (security.otp !== otp || Date.now() - security.otpSendOn > 5 * 60 * 1000) {
        return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await Security.findByIdAndUpdate(security._id, { otp: null }); // Clear OTP after verification

    return res.status(200).json({ message: "Security logged in successfully" });
});



// @desc Logout resident
// @route POST /api/auth/security/logout

exports.logoutSecurity = asyncHandler(async (req, res) => {
    res.cookie("security", "", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 0,
    });
    res.status(200).json({ message: "Security logged out successfully" });
});