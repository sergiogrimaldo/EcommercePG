import React from "react"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router";

export default function ResetPassword({token}){

    const history = useHistory()

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState(
        {
            password:"",
            passRepeated: "",
        }
    )

    async function handleChange(e){
        setInput({
            ...input,
            [e.target.id]: e.target.value,
        })
        if(e.target.id==="password"){
            if(!e.target.value){
                setErrors(
                    {...errors,
                    password : 'Please enter a password',
                    }

                )
            }
            else{
                setErrors({
                    ...errors,
                    password: "",
                }
                )
            }
        }
        if(e.target.id==="passRepeated"){
            if(!e.target.value){
                setErrors(
                    {...errors,
                        passRepeated : 'Please repeat your password',
                    }

                )
            }
            else{
                setErrors({
                    ...errors,
                    passRepeated: "",
                }
                )
            }
            
        }
    }

    const  handleSubmit = async function(e) {
        e.preventDefault()
        if(e.target[0].value === e.target[1].value){
            await axios.post(`http://localhost:3001/users/resetPassword/${token}`,{newPass : input.password})  
            alert('Your password has been change sucessfully')
            history.push('/home'); 
        }
        else{
            alert('The passwords must be the same')
        }
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
                {errors.password && (
                        <p>{errors.password}</p>
                    )}
                <label>Repeat Password:</label>
                <input
                type="password"
                id="passRepeated"
                onChange={e => handleChange(e)}
                />
                {errors.passRepeated && (
                        <p>{errors.passRepeated}</p>
                    )}
                <button type="submit" disabled={errors.password || errors.passRepeated}>
                    Change password
                </button>
            </form>
        </div>
    )
}