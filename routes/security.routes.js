const router = require('express').Router()
const { createVisitor, getAllVisitors } = require('../controllers/security.controller')

router
    .post('/create-visitor', createVisitor)
    .get('/all-visitor', getAllVisitors)

module.exports = router