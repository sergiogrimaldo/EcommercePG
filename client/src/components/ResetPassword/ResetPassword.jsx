import React from "react"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router";

export default function ResetPassword({token}){

    const history = useHistory()

    const [input, setInput] = useState(
        {
            password:"",
            passRepeated: "",
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
        await axios.post(`http://localhost:3001/users/resetPassword/${token}`,{newPass : input.password})  
        console.log(input.password)
        alert('Your password has been change sucessfully')
        history.push('/home'); 
    }
    

    return(
        <div>
            <form onSubmit={e => handleSubmit(e)}>
                <label>Password:</label>
                <input
                type="password"
                id="password"
                onChange={e => handleChange(e)}
                />
                <label>Repeat Password:</label>
                <input
                type="password"
                id="passRepeated"
                onChange={e => handleChange(e)}
                />
                <button type="submit">
                    Change password
                </button>
            </form>
        </div>
    )
}