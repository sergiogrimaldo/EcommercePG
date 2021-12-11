import React from "react";
import { Link } from 'react-router-dom';


export default function AccountActivation() {

    return (
        <div style={{display: 'grid', justifyContent: 'center', alignItems:'center', padding:220, textAlign: 'center'}}>
            <h2>Your account has been activated!</h2>
            <Link to="/home"> <button
            style={{padding:10, cursor:'pointer'}}
            ><h1>Go back to our store!</h1></button></Link>
        </div>
    )
}