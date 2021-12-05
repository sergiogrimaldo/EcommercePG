import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
import {paymentMessage} from '../../redux/actions/index.js';
import accounting from 'accounting';
import { Button }from '@material-ui/core';
import axios from 'axios';


function CheckoutList({backStep,nextStep}) {

    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);
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
                const  {data} = await axios.post('http://localhost:3001/orders',{id,amount:total})
            
                console.log('recibido',data.message)
                dispatch(paymentMessage(data.message))

                elements.getElement(CardElement).clear();
                nextStep();


            }catch(err){
                console.log('cargando...',err)
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
