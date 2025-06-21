const { registerAdmin, fetchAdmin, createPlan, superadminBlockUnblockSociety, getPlans, updatePlan, deletePlan, viewSocietyDetails } = require('../controllers/superadmin.controller');

const router = require('express').Router();

router
    .get("/fetch-admin", fetchAdmin)
    .get("/fetch-allPlans", getPlans)
    .get("/superadmin/view-society/:id", viewSocietyDetails)
    .post('/create-plan', createPlan)
    .patch('/update-plan/:id', updatePlan)
    .delete('/delete-plan/:id', deletePlan)
    .patch("/blockUnblock-superadmin-society/:aid", superadminBlockUnblockSociety)

module.exports = router;