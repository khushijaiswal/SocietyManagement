const router = require('express').Router();
const { registerSuperAdmin, loginSuperAdmin, logoutSuperAdmin, registerAdmin, loginAdmin, logoutAdmin, loginResident, logoutResident, loginSecurity, logoutSecurity, verifySecurityOTP } = require('../controllers/auth.controller');

router
    // super admin routes
    .post('/superadmin/register', registerSuperAdmin)
    .post('/superadmin/login', loginSuperAdmin)
    .post('/superadmin/logout', logoutSuperAdmin)

    // admin routes
    .post('/admin/register', registerAdmin)
    .post('/admin/login', loginAdmin)
    .post('/admin/logout', logoutAdmin)

    // resident routes
    .post('/resident/login', loginResident)
    .post('/resident/logout', logoutResident)

    // security routes
    .post('/security/login', loginSecurity)
    .post('/security/verify-otp', verifySecurityOTP)
    .post('/security/logout', logoutSecurity)
module.exports = router;