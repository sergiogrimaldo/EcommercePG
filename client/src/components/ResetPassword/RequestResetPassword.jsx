import React from "react"
import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router";
import s from './RequesResetPassword.module.css';


// async function validate({input}){

//     console.log(input)

//     const users = (await axios.get('http://localhost:3001/users')).data

//     let errors= {};
    
//     if(!input.email){
//         errors.email = 'Please enter an email'
//     }
//     if(users.some(user => user.email === input.value)){
//         errors.emailVal = 'Invalid Email'
//     }
    
//     return errors;
// }



export default function RequestResetPassword(){

    const history = useHistory()

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState(
        {
            email:"",
        }
        
    )


    async function handleChange(e){
        setInput({
            ...input,
            [e.target.id]: e.target.value,
        })
        if(e.target.id==="email"){
            if(!e.target.value){
                setErrors(
                    {...errors,
                    email : 'Please enter an email',
                    }

                )
            }
            else{
                setErrors({
                    ...errors,
                    email: "",
                }
                )
            }
            
        }
    }

    const handleSubmit = async function(e) {
        e.preventDefault()
        const users = (await axios.get('/users')).data
            let valid = false
            users.forEach(function(user) {
                if(user.email === e.target[0].value){
                    valid = true
                    return valid
                }
            });
            
                if(!valid){
                        setErrors({
                            ...errors,
                            email : 'Invalid Email',
                        })
                    // console.log(user.email)
                    // console.log(e.target[0].value)
                }
            
            //console.log(valid)
            if(valid){
                await axios.post('/users/resetPassword',{email : input.email, tokenCase: 'resetPassword'})
                alert('Check your email')
                history.push('/home');
            }
        
    }
    

    return(
        <div className={s.container} style={{color: "black"}}>
        
        
            <form className={s.form} onSubmit={e => handleSubmit(e)}>
            <h2 className={s.title}>Please enter your email</h2>
                <label>Email:</label>
                <input
                type="text"
                id="email"
                className={s.input}
                onChange={e => handleChange(e)}
                />
                {errors.email && (
                        <p className={s.error}>{errors.email}</p>
                    )}
                <button type="submit" disabled={errors.email} className={s.btn}>
                    Send email
                </button>
            </form>
        
        </div>
    )
}
