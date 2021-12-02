//const addOrders= async function({userId,cart}) { 
const { Order, Shoe, Color, Brand, AvaiableSizes, Role, Price, User } = require("../../src/db");

const addOrderToDB= async function({userId, cart}) { ////// esta funcion recibe un userID y un carrito (cart)

    /// la mockOrder viene a simular un carrito, podria pasarse un carrito pero deberia coincidir con este formato
    //let mockOrder = [{shoeId:1,name:"Jordan 11 Retro Cool Grey (2021)",size:4,cuantity:1 , subtotal:225, color:'Bordeaux'}]
    
    // tendria que pasar id del usuario aca
    let user = await User.findByPk(userId)
    console.log(user)
    console.log(cart)
    // acc va a ser el total (suma de subtotales)
    let acc = 0

    //mockOrder.forEach(item => acc =+ item.subtotal)
    cart.forEach(item => acc =+ item.subtotal)

    // creo la orden con el total
    let order = await Order.create({total:acc}) 
    // a la orden le seteo el user
    await order.setUser(user) 
    
    for (zapatilla of cart){ /// recorro los objetos de la orden (osea del carrito)
        // por zapato en carrito agregarlo a la orden
        let shoe = await Shoe.findByPk(zapatilla.shoeId) 
        console.log(shoe)
        /// agrego a la orden
        await order.addShoe(shoe, {through:{cuantity:zapatilla.cuantity,subtotal:zapatilla.subtotal,color:zapatilla.color}})  
        /// busco talles de zapatilla
        let sizes = await shoe.getAvailableSize()  
        console.log(sizes)
        // tamaño de zapatilla en el carrito
        let shoesize=zapatilla.size  
        // le resto la cantidad al tamaño de la zapatilla
        sizes[shoesize] = sizes[shoesize]-(zapatilla.cuantity)  
        // guardo cambios
        await sizes.save() 
        shoe.stock = shoe.stock - zapatilla.cuantity // le resto cantidad al stock total de zapatillas
        await shoe.save()   
        // update supuestamente guarda los cambios, pero por las dudas guardo todo  

    }

    //return(console.log('orden creada'))
    return('orden creada') // por si quiero devolver un mensaje en algun lado
}

const getOrdersFromDB = async function ({email="", id=""}){

    const user = await User.findOne({where: { email:email }})

    if(!user){
        return "Invalid User"
    }

    if(id){
        let order = await Order.findByPk(id);
        if(user.roleId === 2){
            return order;
        } else {
            if(user.id === order.userId){
                return order;
            } else {
                return "You don´t have access to this server"
            }
        }
    }


    if(user.roleId === 2){
        return ( await Order.findAll({
            include: { model: Shoe },}) )
    } else {
        return ( await Order.findAll({include: { model: Shoe }, where: {userId: user.id}}))
    }
    

}

const updateStatusOrderFromDB = async function({email="", status="", id=""}){


    const user = await User.findOne({where: { email:email }})

    console.log(user)

    if(user.roleId === 2){
        let order = await Order.findByPk(id);
        order.status = status;
        await order.save();
        return order;
    }else{
        return "You don´t have access to this action"
    }
}


module.exports = {addOrderToDB, getOrdersFromDB, updateStatusOrderFromDB}