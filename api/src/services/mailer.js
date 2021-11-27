

export const sendmail = function({template, payload}){
    let emailBody
    switch (template){
        case 'activate account':{
            emailBody= `${payload.name} se ha registrado una cuenta a tu nombre en nuestra tienda! <br> por favor haz click aqui para confirmar tu registro`
        }
        case 'shoppingDetails':{
            emailBody= `Felicidades ${payload.name} haz comprado los siguientes productos! presenta esta factura o este codigo QR para retirar en cualquier sucursal disponible!`
        }
    }
}