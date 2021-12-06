import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
import {paymentMessage, clearCart, makeBuyOrder, getOrders} from '../../redux/actions/index.js';
import accounting from 'accounting';
import { Button }from '@material-ui/core';
import axios from 'axios';


function CheckoutList({backStep,nextStep}) {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);
    let total = 0;
    cart?.forEach((item) => {
        total = total + item.price;
    });

    async function onHandleSubmit(e){
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)
        })
        // accounting.formatMoney(`${total}`)} `${total}

        if(!error){
            try{
                const {id} = paymentMethod
                const  {data,status} = await axios.post('http://localhost:3001/orders/payment',{id,amount:total})
    
                    /// mando
                console.log('envio exitoso')
                dispatch(makeBuyOrder({userId:user.id, cart:cart}))
                dispatch(clearCart())
                await dispatch(getOrders({email:user?.email}))
                    // limpi
                
                console.log('recibido',data)
                dispatch(paymentMessage(data.message))
                
                nextStep();
                // elements.getElement(CardElement).clear();


            }catch(err){
                console.log('cargando...',err)
                dispatch(paymentMessage('Payment was unsuccesfull please try again with correct card details'))
                nextStep();
            }             

        }
        
    }

    return (
        <div>
            <form onSubmit={onHandleSubmit}>
                <CardElement/>
                <Button onClick={backStep}>Back</Button>
                <Button type='submit' variant='contained'disabled={false} color='primary'>Pay: {accounting.formatMoney(total)}</Button>
            </form>
        </div>
    )
}

export default CheckoutList
