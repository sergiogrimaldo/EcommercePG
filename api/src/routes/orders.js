const { Router } = require("express");
const axios = require("axios");
const Stripe = require("stripe")
//const { conn, Shoe, Color, Brand, AvailableSizes, Role, Price } = require("./src/db.js");
const { addOrderToDB, getOrdersFromDB, updateStatusOrderFromDB } = require("../services/dbServices.js");

const router = Router();

// llave privada a stripe
const stripe = new Stripe("sk_test_51K2dGKJ8rEWDJkMVI4Ppno1uwJVUGB6O0cgvIUACjJt0wzzGB3MgfqXp6FQOXoEXLGo8xVfv0RgjWRsGAdVg3HP600sYbspyXY")

router.post("/payment", async (req, res, next) => {
   const {amount,id} = req.body;
    //let cart = [].concat(await JSON.parse(req.body.cart))
    console.log('soy las props del fron', req.body)
    try{
        const paymentCurrent = await stripe.paymentIntents.create({
            amount,
            currency:"USD",
            description:"shoes find all",
            payment_method:id,
            confirm:true,

        })
        console.log('hola', paymentCurrent)
        return res.status(200).json({message:"Succesfull payment"})
    }
    catch(err){
        return res.status(300).json({message:err.raw.message})
    }
    
    //res.json(await addOrderToDB({userId:req.body.userId, cart:req.body.cart})) 
    // al servicio para agregar a la DB se le tiene que pasar un userId y un objeto cart
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

router.post("/", async (req, res, next) => { 
    console.log(req.body)
    res.json(await addOrderToDB({userId:req.body.userId, cart:req.body.cart, shippingInfo:req.body.shippingInfo})) 
})

module.exports = router;
