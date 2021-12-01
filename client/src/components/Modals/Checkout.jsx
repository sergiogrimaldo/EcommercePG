import {useSelector, useDispatch} from 'react-redux'
import { closeModal } from '../../redux/actions'
import { sendOrderDetails } from '../../redux/actions'
import { useState } from 'react'
export default function Checkout (){
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user)

    const [adress, setAdress] = useState('')
    const [email, setEmail] = useState(user.profileObj.email)
    // COMMENTED UNTIL  BUGGED CART FIX
    // const cart = useSelector(state => state.cart)

    function handleAdressChange(e){
        setAdress(e.target.value)
    }

    function handleEmailChange(e){
        setEmail(e.target.value)
    }
    let total = 0
    cart?.forEach(item => {
        console.log(item)
        total = total+item.price
        }
    )

    return(
        <div style={{
            position:'absolute',
            backgroundColor:'rgba(0,0,0,0.65)',
            zIndex:10,
            height:'100vh',
            display:'grid',
            alignItems:'center',
            width:'100%',
            justifyItems:'center'}}>

            <div style={{
                backgroundColor:'white',
                display:'grid',
                flexDirection:'row', 
                borderRadius:15,
                alignItems:'center', 
                border:'1px solid black', 
                justifyItems:'center',
                width:'40%',
                padding:40, }}>

    <h1 style={{marginTop:0}}>CHECKOUT</h1>

            {/* //// FOTO - NOMBRE -- PRECIO */}
                <div>You are purchasing for a total of US$ {total}</div>
                <br/>
            <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',}}>            
                {/* { cart.map((item) => {
                    // <img src={}></img>
                })} */}
                <label style={{textAlign:"center"}} for='email'>Email:</label><input style={{width:'100%'}} id='email' defaultValue={email} onChange={(e) => handleEmailChange(e)}></input>
                <label style={{textAlign:"center"}} for='adress'>Adress:</label><input style={{width:'100%'}} type='adress' id='adress' placeholder="Shipping adress" onChange={(e) => handleAdressChange(e)}></input>
            </div>
            <div style={{marginTop:25, display:'flex', width:'50%',justifyContent:'space-around'  }}>
                <button style={{padding:10,backgroundColor:'black',color:'white',borderRadius:5, padding:10 ,border:'1px solid black'}} className='primaryButton' type='submit' onClick={() => dispatch(sendOrderDetails({name:user.profileObj.givenName,email,adress,cart}))}>Buy</button>
                <button style={{padding:10,backgroundColor:'white',color:'black',borderRadius:5 ,border:'1px solid black'}} className='secondaryButton' onClick={() => dispatch(closeModal())} >Close</button>
            </div>
        </div>
    </div>
    )

}