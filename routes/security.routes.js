const router = require('express').Router()
const { createVisitor, getAllVisitors, checkoutVisitor } = require('../controllers/security.controller')

router
    .post('/create-visitor', createVisitor)
    .patch('/visitor-checkout/:id', checkoutVisitor)
    .get('/all-visitor', getAllVisitors)

module.exports = router