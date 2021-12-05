import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Styles } from './EditShoe.module.css'
import { getShoeDetails } from "../../redux/actions/index.js";



export default function EditShoe(id) {

    const dispatch = useDispatch();




    useEffect(() => {
        dispatch(getShoeDetails(id));
    }, [dispatch]);

    return (
    
    <div>
        <p>HOLA</p>
    </div>
    
    )
}





