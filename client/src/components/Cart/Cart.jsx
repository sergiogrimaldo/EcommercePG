import React from 'react'
import { useSelector,useDispatch } from "react-redux";
import {removeFromCart} from '../../redux/actions';

import accounting from 'accounting';
import { Typography } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton  from '@material-ui/core/IconButton';

export default function Cart() {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()

    let nombreItems = []
    let cantidadTotal = 0
    /// me guardo nombre unico de los objetos de la tienda, para solo renderizarlos una vez
    cart?.forEach(item => {
        if (!nombreItems.includes(item.name)){
            nombreItems.push(item.name)
        }  
    })

    // funcion onclick para despachar una accion que me permita eliminar u shot de mi carrito
    function onHandleDelete(item){
        dispatch(removeFromCart(item))

    }
   

    return (
            <>
                <h1>My cart</h1>
                { (cart && JSON.stringify(cart).length > 2) ?
                    cart.map((item) =><div key={item.id}>
                    <img style={{height: 270}} src={item.image}/>
                    <h1>{item.name}</h1>
                    <h2>cuantity: {item.cuantity}</h2>
                    <h2>price: {accounting.formatMoney(item.price)}</h2>
                   
                    <IconButton onClick={() => onHandleDelete(item)}>
                        <DeleteIcon fontSize='large'/>
                    </IconButton>
                    </div>
                    ) : <h1>No items in cart!</h1>
                }
                
                
            </>
    )
 }
