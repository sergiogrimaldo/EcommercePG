import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { closeModal } from "../../redux/actions";
import { postUser, getUsers, sendActivateEmail } from "../../redux/actions";
import s from './SignUp.module.css'


export default function SignUp(){
    const dispatch = useDispatch()

    const allUsers = useSelector(state => state.allUsers)

    useEffect(()=>dispatch(getUsers()),[])   

    const [errors, setErrors] = useState({});

    const [input, setInput] = useState(
        {
            name: "",
            email: "",
            password: "",
        }
    )

    function handleChange(e){
        setInput({
            ...input,
            [e.target.id]: e.target.value,
        })
        // setErrors(validate({
        //     ...input,
        //     [e.target.id]: e.target.value,
        // }));
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
        if(e.target.id==="name"){
            if(!e.target.value){
                setErrors(
                    {...errors,
                    name : 'Please enter a name',
                    }

                )
            }
            else{
                setErrors({
                    ...errors,
                    name: "",
                }
                )
            }
        }
        if(e.target.id==="email"){
            if(!e.target.value){
                setErrors(
                    {...errors,
                    email : 'Please enter an email',
                    }

                )
            }
            if(allUsers.some(user => user.email === e.target.value)){
                //console.log(errors)
                setErrors(
                    {...errors,
                    email : 'You already got an account with this email',
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

    async function handleSubmit(e){
        e.preventDefault();
        await dispatch(postUser(input));
        //console.log(input)
        alert('User created successfully, please confirm your email');
        dispatch(sendActivateEmail({email:input.email, tokenCase:"validateUser"}));
        setInput({
            name: "",
            email: "",
            password: "",
        })
        dispatch(closeModal())
    }

    // console.log(input)

    return(
        <div style={{
            position:'fixed',
            backgroundColor:'rgba(0,0,0,0.65)',
            zIndex:10000,
            height:'100vh',
            color: "black",
            display:'grid',
            alignItems:'center',
            width:'100%',
            justifyItems:'center'}}>

            <div style={{
                backgroundColor:'white',
                display:'grid',
                flexDirection:'row', 
                borderRadius:15,
                alignItems:'center', 
                border:'1px solid black', 
                justifyItems:'center',
                padding:40, }}>

    <h1 style={{marginTop:0}}>REGISTER</h1>
        <form onSubmit={e => handleSubmit(e)}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',}}>
                <label style={{textAlign:"center"}} for='email'>Email:</label>
                    <input 
                    type='text' 
                    id='email' 
                    placeholder="type your email"
                    value={input.email}  
                    onChange={e => handleChange(e)}></input>
                    {errors.email && (
                        <p className={s.error}>{errors.email}</p>
                    )}            
                <label style={{textAlign:"center"}} for='name'>Username:</label>
                    <input 
                    id='name' 
                    placeholder='type your username'
                    type='text'
                    value={input.name} 
                    onChange={e => handleChange(e)}></input>
                    {errors.name && (
                        <p className={s.error}>{errors.name}</p>
                    )}
                <label style={{textAlign:"center"}} for='password'>Password:</label>
                    <input 
                    type='password' 
                    id='password' 
                    placeholder="type your password" 
                    value={input.password}
                    onChange={e => handleChange(e)}></input>
                    {errors.password && (
                        <p className={s.error}>{errors.password
                        }</p>
                    )}
            </div>
            <div style={{marginTop:25, display:'flex', width:'100%',justifyContent:'space-around'  }}>
                <button style={{padding:10,backgroundColor:'black',color:'white',borderRadius:5 ,border:'1px solid black'}} 
                className='primaryButton' type='submit' 
                disabled={ errors.name || errors.email || errors.password }>Register</button>
                <button style={{padding:10,backgroundColor:'white',color:'black',borderRadius:5 ,border:'1px solid black'}} 
                className='secondaryButton' onClick={() => dispatch(closeModal())} >Close</button>
            </div>
        
        </form>
        </div>
        
    </div>
    )


}
