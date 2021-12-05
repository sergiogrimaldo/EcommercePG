const nodemailer = require('nodemailer')
var smtpTransport = require('nodemailer-smtp-transport');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const transporter = nodemailer.createTransport(smtpTransport({
    host: 'smtp.gmail.com',
    auth: {
        user: 'zapapp.henry@gmail.com',
        pass: 'ohlostvkudkqisve'
    }
}))

 const sendMail = async function ({template, payload}){
    console.log(payload)
    let total = 0
    let id = uuidv4().slice(0,7)

    let nombreItems = []
    /// me guardo nombre unico de los objetos de la tienda, para solo renderizarlos una vez
    
    payload.cart.forEach(item => {
        if (!nombreItems.includes(item.name)){
            nombreItems.push(item.name)
        }})

    payload.cart.forEach(item => {
        total = total+item.price
        }
    )

    

     //console.log(payload)
    await transporter.sendMail({
        from: 'JSEC Store zapapp@zapapp.com',
        to: payload.email,
        subject: `Order details #${id}`,
        html: `Hi ${payload.name}! These are the details of your purchase, have a nice day! :
        <br> 
        <ul>
        <li>
        Shipping Adress: ${payload.adress}
        </li>
        <li>items: <ul>${payload.cart.map(item => (nombreItems.includes(item.name) ? '<br>'+nombreItems.splice(nombreItems.indexOf(item.name),1) +' x '+ item.cuantity+' at US$ '+ item.price+' each' : ''))}</ul></li>
        <br>
        <li>TOTAL: US$ ${total}</li>
        </ul>
        `
    }
    ).then( () =>{ return 'mail mandado con exito'}).catch(err => console.log(err))
    
}

const sendPasswordEmail = async function({payload}){

    //Agregar verificación de que el usuario existe y modificar la 
    //password del usuario por la pass enviada
    console.log(payload)

    let pass = 'TemporalPass'

    await transporter.sendPasswordEmail({
        from: 'JSEC Store zapapp@zapapp.com',
        to: payload.email,
        subject: `Password Reset`,
        html: `Hi ${payload.name}! 
        This is your new password, remember to change it immediately after logging in.
        ${pass} 
        Have a nice day!`
    }
    ).then( () =>{ return 'Email sent'}).catch(err => console.log(err))
}

module.exports = {sendMail, sendPasswordEmail}