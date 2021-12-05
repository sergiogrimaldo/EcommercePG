import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function ResetPassword(){

    const [email, setEmail] = useState(
        {
            email: "",
        }
    )

    function handleChange(e){
        setEmail({
            [e.target.id]: e.target.value,
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        alert('Go to your email');
        setEmail({
            email: "",
        })
    }

    return ( 
    
    <div>
        <form onSubmit={e => handleSubmit(e)}>
            <h1>Reset Password</h1>
            <label>Email:</label>
                <input 
                    type='text'
                    id='email'
                    placeholder="Insert your email"
                    onChange={e => handleChange(e)}
                />
            <button type='submit'>Send</button>
        </form>
    </div> 

    )
}