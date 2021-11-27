import { useSelector } from "react-redux"

export default function Cart() {
    const cart = useSelector(state => state.cart)
    let nombreItems = []
    let cantidadTotal = 0
    /// me guardo nombre unico de los objetos de la tienda, para solo renderizarlos una vez
    cart.forEach(item => {
        if (!nombreItems.includes(item.name)){
            nombreItems.push(item.name)
        }
        
    })

    console.log(nombreItems)
    return (
<>
            <h1>My cart</h1>
        { (cart && JSON.stringify(cart).length > 2) ?

            

            cart.map((item) =><>
            <img style={{height: 270}} src={item.image}/>
            <h1>{item.name}</h1>
            <h2>cuantity: {item.cuantity}</h2>
            <h2>price: {item.price}</h2>
            <h3>total: {item.cuantity * item.price}</h3>
            </>
            ) : <h1>No items in cart!</h1>
        }
        
</>
    )
 }
