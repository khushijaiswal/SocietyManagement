const { registerResident, registerSecurity, getAllResidents, getAllComplaints, getAllVisitors, getAllSecurity, updateCompliantStatus, amenities, addAmenities, adminBlockUnblockResident, deleteResident, updateResident, viewAmenitiesBookings, updateAmenitiesStatus, CreateNotice, setMaintenanceSetting, viewAllMaintenancePayments, viewAllAmenities, adminBlockUnblockSecurity, deleteSecurity, updateSecurity } = require('../controllers/admin.controller');
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
    .patch("/update-security/:sid", updateSecurity)

    .patch("/blockUnblock-admin-security/:sid", adminBlockUnblockSecurity)

    .delete('/delete-resident/:rid', deleteResident)
    .delete("/delete-security/:sid", deleteSecurity)

module.exports = router;