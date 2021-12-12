import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import {Paper, Stepper, Typography, Step,StepLabel} from "@material-ui/core";
import style from './CheckoutForm.module.css';
import AddressForm from './AddressForm';
import PaymenForm from './PaymenForm';
import Confirmation from  './Confirmation.jsx';

function CheckoutForm({shippingDetails}) {
    
    const [state,setState] = useState(0)
    const paymentMessage = useSelector(state => state.paymentMessage)
    // creo un array para definir cada paso al momento de realizar una compra exitosa
    const steps = ["Shipping address","Payment details"];

    function nextStep () {
        setState(prevState => prevState + 1)
    }

    function backStep () {
        setState(prevstate => prevstate - 1)
    }

    function Form () {
        return state === 0 ? <AddressForm nextStep={nextStep}/>
         : <PaymenForm  nextStep={nextStep} backStep={backStep}/>
    }

    return (
        <>
            <div className={style.layout}>
                <Paper className={style.paper}>
                    <Typography component='h1' variant='h4' align='center'>
                         Checkout 
                    </Typography>
                    <Stepper activeStep={state} className={style.stepper}>
                        {
                            steps.map(e =>(
                                <Step key={e}>
                                    <StepLabel>{e}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    {
                        state === steps.length ? (<Confirmation backStep={backStep} message={paymentMessage}/>):(<Form />)
                    }
                </Paper>

            </div>
            
        </>
    )
}

export default CheckoutForm

