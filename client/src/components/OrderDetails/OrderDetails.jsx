import { useDispatch, useSelector } from 'react-redux';
import {getOrderDetails} from '../../redux/actions'
import {useEffect, useState} from 'react'
import style from "./orderDetails.module.css"; 
import { Link } from 'react-router-dom';

export default function OrderDetails({id}){
    const dispach = useDispatch();
    const orderDetails = useSelector( state => state.orderDetails)
    const user = useSelector( state => state.user) 
    useEffect(() => {
        
        dispach(getOrderDetails({email: user.email, id:id}))
        
    }, [])
    return (
        <div style={{display:'grid', alignItems:'center', marginTop:20, alignContent:'center', justifyContent:'center', width:'100vw'}}>
            {
                user && orderDetails && JSON.stringify(orderDetails).length > 2 && 
                <>               
                    <div style={{textAlign:'center',marginBottom:10}}>
                        <h1>#{orderDetails?.orderId?.split('-')[0]}</h1>
                        <h2>Status: {orderDetails.status}</h2>
                    </div>
                    <div style={{backgroundColor:'white' , width:'70vw', borderRadius:'15px', boxShadow:'0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'}}>
                        {
                            //console.log(orderDetails)
                        }
                        {
                            orderDetails.shoes?.map(shoe => 
                            <Link to={`/shoe/${shoe.id}`} style={{cursor:'pointer',display:'grid', gridTemplateColumns:'0.5fr 1fr',justifyItems:'center', alignItems:'center',justifyContent:'center' }}>
                                <img style={{marginLeft:'56px'}} src={shoe.thumbnail} 
                                alt="not found"
                                width="300px"    
                                />
                                <div>
                                <h2 style={{gridColumn:'2', margin:0}}>{shoe.shoeName}</h2>
                                {/* <h3 style={{gridColumn:'2', color: 'black', margin:0}}>{shoe.Order_Shoes.color}</h3> */}
                                <h3 style={{gridColumn:'2', color: 'black', margin:0}}>Price: US${shoe.price}</h3>
                                <h3 style={{gridColumn:'2', color: 'black', margin:0}}>Size: {shoe.size}</h3>
                                <h3 style={{gridColumn:'2', color: 'black', margin:0}}>Cuantity: {shoe.cuantity}</h3>
                                <h3 style={{gridColumn:'2', color: 'black', margin:0}}>Sub total: US${shoe.price*shoe.cuantity}</h3>
                                </div>
                            </Link>
                            )
                        }
                    </div>
                    <h2 style={{position:'fixed', bottom:'0', width:'100vw', textAlign:'center', borderTop:'1px solid black'}}>Total: US${orderDetails.total}</h2>
                </>}
        </div>
    )
}
