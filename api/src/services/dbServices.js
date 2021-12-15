//const addOrders= async function({userId,cart}) { 
const { Order, Shoe, Color, Brand, AvaiableSizes, Role, Price,Order_Shoes, User, Size } = require("../../src/db");

const addOrderToDB= async function({userId, cart, shippingInfo}) { ////// esta funcion recibe un userID y un carrito (cart)

    /// la mockOrder viene a simular un carrito, podria pasarse un carrito pero deberia coincidir con este formato
    //
    let mockOrder = [{shoeId:1,name:"Jordan 11 Retro Cool Grey (2021)",size:4,cuantity:1 , subtotal:225}]
    //console.log(shippingInfo, 'shippingInfo')
    const {name, lastName, address, phone, email} = shippingInfo
    // tendria que pasar id del usuario aca
    let user = await User.findByPk(userId)
    
    // acc va a ser el total (suma de subtotales)
    cart.map(item => item.subtotal = item.cuantity * item.price)
    //console.log(cart)
    let acc = 0
    
    cart.forEach(item => acc = acc + item.subtotal)

    
    // creo la orden con el total y shipping details

    let order = await Order.create({total:acc, name, lastName, adress:address, phone, email}) 

    // a la orden le seteo el user
    await order.setUser(user) 
    
    for (zapatilla of cart){ /// recorro los objetos de la orden (osea del carrito)
        console.log(zapatilla)
        // por zapato en carrito agregarlo a la orden
        let shoe = await Shoe.findByPk(zapatilla.id) 
        //let size = await Size.findOrCreate({where:{name:zapatilla.size}, defaults:{name: zapatilla.size}})
        /// agrego a la orden
        //console.log(size)
        // try {
        //     await buscarShoe.addSize(size[0].id)

        // }catch(err){
        //     console.log(err)
        // }

        //await order.addShoe(shoe, {through:{sizeId:size[0].id,cuantity:zapatilla.cuantity,subtotal:zapatilla.subtotal}})  
        await Order_Shoes.create({orderId:order.id,shoeId: shoe.id, size:zapatilla.size, cuantity:zapatilla.cuantity,subtotal:zapatilla.subtotal })
        /// busco talles de zapatilla

        let sizes = await shoe.getAvailableSize()  
        ////console.log(sizes)

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
    //await order.save()
    return('orden creada') // por si quiero devolver un mensaje en algun lado
}

const getOrdersFromDB = async function ({email="", id=""}){

    const user = await User.findOne({where: { email:email }})
    //encuentro al usuario 

    if(!user){
        return "Invalid User"
    }
    //si no esxite 


    if(id){


        let order
        try{
            let order = await Order_Shoes.findAll({where:{orderId:id},raw:true})
            let shoes = []
            let totalAcc = 0
            let generalOrder = await Order.findByPk(id,{raw:true})
            for (ord of order){
                console.log(ord.shoeId)
                let foundShoe=await Shoe.findByPk(ord.shoeId,{raw:true})
                let price = await Price.findByPk(foundShoe.priceId,{raw:true})
                totalAcc = totalAcc + (ord.cuantity*price.retailPrice)
                shoes.push({...foundShoe,size:ord.size,cuantity:ord.cuantity, price:price.retailPrice})
            }
            order[0].status = generalOrder.status
            order[0].shoes = shoes
            order[0].id = id
            order[0].total = totalAcc
           
            return JSON.parse(JSON.stringify(order[0]))
           //return (await Order_Shoes.findAll({where:{orderId:id},raw:true}))
        }catch(err){
            console.log(err);
        }
                 
            if(!order){
                return 
            }
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
    //si te pide una orden en especifico: si es admi la devulvo 
    //sino verifico que sea del usuario y si es la devuelvo


    if(user.roleId === 2){
        //return 
        return (await Order.findAll({include: [{ all: true }]}))
        
    } else {
        return ( await Order.findAll({include: { model: Shoe }, where: {userId: user.id}}))
    }
    //si me piden todas las ordenes: si es admi devuelvo todas 
    //sino verifico y devuelvo solo las del usuario que las solicita

}

const updateStatusOrderFromDB = async function({email="", status="", id=""}){


    const user = await User.findOne({where: { email:email }})

    //console.log(user, "user dbservice")

    if(user.roleId === 2){
        let order = await Order.findByPk(id);
        order.status = status;
        await order.save();
        return order;
    }else{
        return "You don´t have access to this action"
    }

    //si es admi puede modificar el estado de la orden solicitada
}


module.exports = {addOrderToDB, getOrdersFromDB, updateStatusOrderFromDB}