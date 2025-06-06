const { registerResident, registerSecurity, getAllResidents, getAllComplaints, getAllVisitors, getAllSecurity, updateCompliantStatus, amenities, addAmenities, adminBlockUnblockResident, deleteResident, updateResident, viewAmenitiesBookings, updateAmenitiesStatus, CreateNotice, setMaintenanceSetting, viewAllMaintenancePayments } = require('../controllers/admin.controller');
const { verifyAndSaveSubscription, initiateSubscriptionPayment } = require('../controllers/payment.controller');

const router = require('express').Router();

router
    .post('/register/resident', registerResident)
    .post('/register/security', registerSecurity)
    .post('/addAmenities', addAmenities)
    .post('/create-notice', CreateNotice)
    .post('/set-maintenance-rate', setMaintenanceSetting)



    .get('/allresidents', getAllResidents)
    .get('/allcomplaints', getAllComplaints)

    .get('/allvisitors', getAllVisitors)
    .get('/allsecurity', getAllSecurity)
    .get('/allamenities', viewAllAmenities)

    .get('/view-amenities-bookings', viewAmenitiesBookings)
    .get('/view-all-maintenance-payments', viewAllMaintenancePayments)


    .patch('/update-complaint-status/:cid', updateCompliantStatus)
    .patch('/update-amenities-status/:bid', updateAmenitiesStatus)
    .patch("/blockUnblock-admin-resident/:rid", adminBlockUnblockResident)
    .patch("/update-resident/:rid", updateResident)


    .delete('/delete-resident/:rid', deleteResident)

module.exports = router;