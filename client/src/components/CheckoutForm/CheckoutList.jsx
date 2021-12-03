import React from 'react';
import { useSelector } from 'react-redux';
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
import accounting from 'accounting';
import { Button }from '@material-ui/core';


function CheckoutList({backStep,nextStep}) {

    const stripe = useStripe();
    const elements = useElements();
    const cart = useSelector(state => state.cart);
    let total = 0;
    cart?.forEach((item) => {
        total = total + item.price;
    });

    async function onHandleSubmit(e){
        e.preventDefault();
        const paymentMethod = await stripe.createPaymentMethod({
            type:'card',
            card: elements.getElement(CardElement)
        })
        console.log('HOLA SOY EL PAYMENT', paymentMethod)
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
