const { registerAdmin, fetchAdmin, createPlan } = require('../controllers/superadmin.controller');

const router = require('express').Router();

router
    .get("/fetch-admin", fetchAdmin)
    .post('/create-plan', createPlan)

module.exports = router;