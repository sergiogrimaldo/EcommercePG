import React from "react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";

export default function AccountActivation({token}) {

    useEffect(async()=> 
    await axios.post(`http://localhost:3001/users/activateAccount/${token}`),
    [])
    return (
        <div style={{display: 'grid', justifyContent: 'center', alignItems:'center', padding:220, textAlign: 'center'}}>
            <h2>Your account has been activated!</h2>
            <Link to="/home"> <button
            style={{padding:10, cursor:'pointer'}}
            ><h1>Go back to our store!</h1></button></Link>
        </div>
    )
}