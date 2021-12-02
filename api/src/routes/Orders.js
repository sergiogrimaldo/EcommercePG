const { Router } = require("express");
const axios = require("axios");
//const { conn, Shoe, Color, Brand, AvailableSizes, Role, Price } = require("./src/db.js");
const { addOrderToDB } = require("../services/dbServices.js");

const router = Router();

router.post("/", async (req, res, next) => {
   
    //let cart = [].concat(await JSON.parse(req.body.cart))
    
    
    res.json(await addOrderToDB({userId:req.body.userId, cart:req.body.cart})) // al servicio para agregar a la DB se le tiene que pasar un userId y un objeto cart
})

module.exports = router;
