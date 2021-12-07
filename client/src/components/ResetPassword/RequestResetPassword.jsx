import React from "react"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router";

export default function RequestResetPassword(){

    const history = useHistory()

    const [input, setInput] = useState(
        {
            email:"",
        }
    )

    function handleChange(e){
        setInput({
            ...input,
            [e.target.id]: e.target.value,
        })
    }

    const  handleSubmit = async function(e) {
        e.preventDefault()
        await axios.post('http://localhost:3001/users/resetPassword',{email : input.email})  
        console.log(input.email)
        alert('Check your email')
        history.push('/home'); 
    }
    

    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Email:</label>
                <input
                type="text"
                id="email"
                onChange={e => handleChange(e)}
                />
                <button type="submit">
                    Send email
                </button>
            </form>
        </div>
    )
}