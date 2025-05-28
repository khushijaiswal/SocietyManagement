// routes/paymentRoutes.js
const express = require('express');
const { verifyAndSavePayment, initiatePayment } = require('../controllers/payment.controller');

const router = express.Router();

router.post('/create-order', initiatePayment);
router.post('/verify', verifyAndSavePayment);

module.exports = router;
