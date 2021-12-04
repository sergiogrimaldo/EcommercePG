import { useDispatch, useSelector } from 'react-redux';
import {getOrderDetails} from '../../redux/actions'
import {useEffect, useState} from 'react'

export default function OrderDetails({id}){
    const dispach = useDispatch();
    const orderDetails = useSelector( state => state.orderDetails)
    const user = useSelector( state => state.user) 
    useEffect(() => {
        
        dispach(getOrderDetails({email: user.email, id:id}))
        
    }, [])
    console.log(orderDetails)
    return (
        <div>
            {
                user && orderDetails && JSON.stringify(orderDetails).length > 2 && 
                <div>
                    <h1>#{orderDetails.id.split('-')[0]}</h1>
                    <h2>Status: {orderDetails.status}</h2>
                    {
                        console.log(orderDetails)
                    }
                    {
                        orderDetails.shoes?.map(shoe => 
                        <div>
                            <img src={shoe.thumbnail} 
                            alt="not found"
                            width="200px"    
                            />
                            <h2>{shoe.shoeName}</h2>
                            <h3>{shoe.Order_Shoes.color}</h3>
                            {/* <h3>{shoe.Order_Shoes.price}</h3> */}
                            <h3>Cuantity: {shoe.Order_Shoes.cuantity}</h3>
                            <h3>Sub total: {shoe.Order_Shoes.subtotal}</h3>
                        </div>
                        )
                    }
                    <h2>Total: {orderDetails.total}</h2>
                </div>
            }
        </div>
    )
}