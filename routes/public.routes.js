const { verifyAndSaveSubscription, initiateSubscriptionPayment } = require('../controllers/payment.controller');
const { getAllPlans } = require('../controllers/public.controller');
const { subscribePlan } = require('../controllers/subscription.controller');
// const { subscribePlan } = require('../controllers/subscription.controller');

const router = require('express').Router();

router.get("/view-all-plans", getAllPlans)
    .post("/subscribe-plan", subscribePlan)
    .post('/verify-subscription', verifyAndSaveSubscription)
    .post('/create-order-subscription', initiateSubscriptionPayment)

module.exports = router;