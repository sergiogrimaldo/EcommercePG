const { Router } = require("express");
// const { Shoe, User, Brand, AvaiableSizes, Color } = require('../db');
// const { Op } = require('sequelize');
const {sendOrderDetails, resetPassword} = require('../controllers/mailerController');

const router = Router();

module.exports = () => {
    router.post('/',sendOrderDetails)
    router.post('/password-reset', resetPassword)
    return router
}