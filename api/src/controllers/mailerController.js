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

const resetPassword = async function (req, res, next){
    const {email, name} = req.body;
    try{
        await sendMail({payload:{email, name}})
        res.json('Email sent')
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {sendOrderDetails, resetPassword}