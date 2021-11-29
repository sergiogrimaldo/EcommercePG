import { useSelector } from "react-redux"

export default function Cart() {
    const cart = useSelector(state => state.cart)
    let nombreItems = []
    let cantidadTotal = 0
    /// me guardo nombre unico de los objetos de la tienda, para solo renderizarlos una vez
    cart?.forEach(item => {
        if (!nombreItems.includes(item.name)){
            nombreItems.push(item.name)
        }})
    let total = 0
    cart?.forEach(item => {
        console.log(item)
        total = total+item.price
        }
    )

    console.log(nombreItems)
    
    console.log(total)
    return (
            <>
            
        <div style={{height:'75vh', overflowX:'hidden', position:'relative'}}>
<div style={{display:"grid", gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr', height:'100%', width:'100%', overflowY:'auto', overflowX:'hidden'}}>
    
    <div style={{ gridColumn:2,display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
        <h2>Name</h2>
    </div>
    <div style={{ gridColumn:3,display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
        <h2>Cuantity</h2>
    </div>
    <div style={{ gridColumn:4,display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
        <h2>Price per Unit</h2>
    </div>
    <div style={{gridColumn:5,display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
        <h2>Subtotal</h2>
    </div>
    
    { (cart && JSON.stringify(cart).length > 2) ?
        cart.map(
            (item) =>
            nombreItems.includes(item.name) ?
            <>
            <div style={{display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                <img style={{height: 150}} src={item.image}/>
            </div>
            <div style={{display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
            {/* TEMPORARY DENSE-LOGIC FIX TO CART */}
                <h1>{nombreItems.splice(nombreItems.indexOf(item.name),1)}</h1>
            {/* FIX ABOVE */}
            </div>
            <div style={{display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                <h2>{item.cuantity}</h2>
            </div>
            <div style={{display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                <h2>{item.price}</h2>
            </div>
            <div style={{display:'flex', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                <h3>{item.cuantity * item.price}</h3>
            </div>  
            </> : null
            ) 
            : <h1>No items in cart!</h1>
        }
        
    </div>
        </div>
        <div style={{display:'flex',position:'absolute',bottom:0,height:'10%', width:'100%',alignItems:'center',borderTop:'1px solid black', justifyContent:'space-around'}}> 
        <h1>Total: US$ {total} </h1>
        <button style={{padding:15,border:'none',backgroundColor:'black',color:'white',borderRadius:5}}><h1>Checkout</h1></button>

        </div>
        </>
)

 }
