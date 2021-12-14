import React from 'react'
import {Typography} from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { getOrders } from '../../redux/actions';
import { useEffect } from 'react';

function Confirmation({message, backStep}) {
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        await dispatch(getOrders({email:user?.email}))
    },[])
    return (
        <>
        <div style={{height:'65vh', backgroundColor:'white', display:'grid', justifyContent:'center'}}>
            <Typography variant='h6'>{message}</Typography>
            {cart.length > 0 && <button onClick={backStep}> Back </button>}
        </div>
        </>
    )
}

export default Confirmation
