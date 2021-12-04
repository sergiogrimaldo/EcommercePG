import { useDispatch, useSelector } from 'react-redux';
import {getOrderDetails} from '../../redux/actions'
import {useEffect, useState} from 'react'

export default function OrderDetails(){
    const dispach = useDispatch();
    const orderDetails = useSelector( state => state.orderDetails)
    const user = useSelector( state => state.user) 
    useEffect(() => {
        
        dispach(getOrderDetails({email: user.email, id:'91c8cbb1-9895-4049-a7af-fef534e5e40f'}))
        
    }, [])
    console.log(orderDetails)
    return (
        <div style={{height: "100vh" }}>
            {
                user && orderDetails && 
                <h1>{orderDetails.status}</h1>
            }
        </div>
    )
}