const { Router } = require("express");
const axios = require("axios");
const Stripe = require("stripe");
const { addOrderToDB, getOrdersFromDB, updateStatusOrderFromDB } = require("../services/dbServices.js");

const router = Router();

const stripe = new Stripe("sk_test_51K2dGKJ8rEWDJkMVI4Ppno1uwJVUGB6O0cgvIUACjJt0wzzGB3MgfqXp6FQOXoEXLGo8xVfv0RgjWRsGAdVg3HP600sYbspyXY");

router.post("/payment", async (req, res, next) => {
    const { amount, id } = req.body;
    try {
        const paymentCurrent = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "shoes find all",
            payment_method: id,
            confirm: true,
        });
        return res.status(200).json({ message: "Succesfull payment" });
    } catch (err) {
        return res.status(300).json({ message: err.raw.message });
    }
});

router.post("/getorders", async (req, res, next) => {
    res.json(await getOrdersFromDB({ email: req.body.email }));
});

router.post("/getorders/:id", async (req, res, next) => {
    res.json(await getOrdersFromDB({ id: req.params.id, email: req.body.email }));
});

router.patch("/:id", async (req, res, next) => {
    res.json(await updateStatusOrderFromDB({ email: req.body.email, status: req.body.status, id: req.params.id }));
});

router.post("/", async (req, res, next) => {
    res.json(await addOrderToDB({ userId: req.body.userId, cart: req.body.cart, shippingInfo: req.body.shippingInfo }));
});

module.exports = router;
