const {sendMail} = require('../services/mailerService')

const sendOrderDetails = async function ( req,res){
    const {name, email, adress,cart} = req.body
    try {
        await sendMail({payload:{name,email,adress,cart}})
        res.json('mail mandado con exito')
    }
    catch (error){
        res.status(404).json(error)
    }
}

module.exports = {sendOrderDetails}