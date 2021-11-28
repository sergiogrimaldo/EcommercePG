const { Router } = require("express");
// const { Shoe, User, Brand, AvaiableSizes, Color } = require('../db');
// const { Op } = require('sequelize');
const {sendOrderDetails} = require('../controllers/mailerController')
const router = Router();

module.exports = () => {
    router.post('/',sendOrderDetails)
    return router
}