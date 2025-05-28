const { initiatePayment, verifyAndSavePayment } = require('../controllers/payment.controller');
const { raiseComplaint, viewComplaints, viewAmenities, bookAmenities, viewBookings, viewNotices, viewNoticeForLoggedInResident, maintenancePayment, viewMaintenancePayments, getActiveMaintenanceSetting } = require('../controllers/resident.controller');

const router = require('express').Router();

router
    .post('/raise-complaint', raiseComplaint)
    .post('/book-amenities/:aid', bookAmenities)
    .post('/maintainance', maintenancePayment)
    .post('/maintainance', maintenancePayment)
    .post('/create-order', initiatePayment)
    .post('/verify', verifyAndSavePayment)

    .get('/view-complaints', viewComplaints)
    .get('/view-amenities', viewAmenities)
    .get('/view-bookings', viewBookings)
    .get('/view-notice', viewNotices)
    .get('/maintenance-setting/active', getActiveMaintenanceSetting)
    .get('/view-maintenance-payments', viewMaintenancePayments)
    .get('/view-notice-loggedInResident', viewNoticeForLoggedInResident)

module.exports = router;