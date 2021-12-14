const { Router } = require("express");
const {sendOrderDetails} = require('../controllers/mailerController')
const router = Router();

module.exports = () => {
    router.post('/',sendOrderDetails)
    return router
}