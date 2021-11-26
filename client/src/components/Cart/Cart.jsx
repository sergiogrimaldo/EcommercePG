import { useSelector } from "react-redux"

export default function Cart() {
    const cart = useSelector(state => state.cart)
    return (
<>

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
