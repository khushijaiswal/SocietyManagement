const asyncHandler = require('express-async-handler');
const Visitor = require('../models/Visitor');


exports.createVisitor = asyncHandler(async (req, res) => {
    const { name, phone, flatNumber, purpose, dateIn, dateOut } = req.body;
    const guardId = req.user;

    if (!name || !phone || !flatNumber || !purpose) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const visitor = await Visitor.create({
        name,
        phone,
        flatNumber,
        purpose,
        dateIn,
        dateOut,
        guardId
    });

    res.status(201).json(visitor);
}
);
exports.getAllVisitors = asyncHandler(async (req, res) => {
    const visitors = await Visitor.find().populate('guardId', 'name phone');
    res.status(200).json(visitors);
}
);

