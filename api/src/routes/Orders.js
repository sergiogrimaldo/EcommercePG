const { Router } = require("express");
const axios = require("axios");
//const { conn, Shoe, Color, Brand, AvailableSizes, Role, Price } = require("./src/db.js");
const { addOrderToDB, getOrdersFromDB, updateStatusOrderFromDB } = require("../services/dbServices.js");

const router = Router();

router.post("/", async (req, res, next) => {
   
    //let cart = [].concat(await JSON.parse(req.body.cart))
    
    
    res.json(await addOrderToDB({userId:req.body.userId, cart:req.body.cart})) // al servicio para agregar a la DB se le tiene que pasar un userId y un objeto cart
})

router.post("/getorders", async (req, res, next) => {
    console.log(req.body)
    res.json(await getOrdersFromDB({email: req.body.email}))
})

router.post("/getorders/:id", async (req, res, next) => {
    res.json(await getOrdersFromDB({id: req.params.id, email: req.body.email}))
})

router.patch("/:id", async (req, res, next) => {
    console.log(req.body)
    //los estados solo pueden ser los nombrados en el modelo order ('Pending', 'In Progress', 'Cancelled', 'Completed')
    //desde el front trabajar solo con esas opciones
    res.json( await updateStatusOrderFromDB({email: req.body.email, status: req.body.status, id: req.params.id}))
})

module.exports = router;
