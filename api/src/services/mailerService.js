const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');

const transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'franciscoberthet@gmail.com',
        pass: 'biiszkwebhhkxmff'
    }
}))

 const sendMail = async function ({template, payload}){
     //console.log(payload)
    transporter.sendMail({
        from: 'zapApp zapapp@zapapp.com',
        to: payload.email,
        subject: 'Detalles de tu compra (Pedido numero #ID pedido)',
        html: `Hola! ${payload.name} estos son los detalles de tu compra realizada en tal fecha ${payload.purchaseInfo}`
    }
    ).then( () =>{ return 'mail mandado con exito'}).catch(err => console.log(err))
    
}

module.exports = {sendMail}