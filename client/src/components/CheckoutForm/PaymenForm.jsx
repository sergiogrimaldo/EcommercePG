import React from 'react';
import {Divider,Typography} from '@material-ui/core';
import Review from './Review.jsx';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutList from './CheckoutList';
import {loadStripe} from '@stripe/stripe-js'; // conectamos stripe con el project

const stripePromise = loadStripe('pk_test_51K2dGKJ8rEWDJkMVCsKYdj8YKbplELKr4X46rMu6hrzizWKes9fCglHzk3dzZ8v7woB6ZRoY2VC98Q2PCuFhpTlc001lAGwNTM') // clave stripe
//Elements permite acceder a las props de stripe material UI/UX

function PaymenForm({backStep,nextStep}) {
    return (
        <div>
            <Review />
            <Divider />
            <Typography variant='h6' gutterBottom style={{margin:'20px 0'}}>
                Payment method Credit
            </Typography>
            
            <Elements stripe={stripePromise}>
                <CheckoutList backStep={backStep} nextStep={nextStep} />
            </Elements>
        </div>
    )
}

export default PaymenForm
