const asyncHandler = require('express-async-handler');
const Visitor = require('../models/Visitor');


exports.createVisitor = asyncHandler(async (req, res) => {
    const { name, phone, flatNumber, purpose, dateIn, dateOut } = req.body;
    const guardId = req.security;

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
    res.status(200).json({ visitors });
}
);

// PATCH /api/security/visitor-checkout/:id
exports.checkoutVisitor = asyncHandler(async (req, res) => {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
        return res.status(404).json({ message: 'Visitor not found' });
    }
    if (visitor.dateOut) {
        return res.status(400).json({ message: 'Visitor already checked out' });
    }

    visitor.dateOut = new Date();
    await visitor.save();

    res.status(200).json({ message: 'Checked out successfully' });
});

