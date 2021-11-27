import { useDispatch } from "react-redux";
import { useState } from "react";
import { closeModal } from "../../redux/actions";
import { postUser } from "../../redux/actions";
import s from './SignUp.module.css'


function validate(input){
    let errors= {};
    
    if(!input.name){
        errors.name = 'Please enter an Username'
    }
    if(!input.email){
        errors.email = 'Please enter an email'
    }
    if(!input.password){
        errors.password = 'Please enter a password'
    }
    
    return errors;
}


export default function SignUp(){
    const dispatch = useDispatch()

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
        setErrors(validate({
            ...input,
            [e.target.id]: e.target.value,
        }));
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postUser(input));
        alert('Welcome');
        setInput({
            name: "",
            email: "",
            password: "",
        })
        dispatch(closeModal())
    }

    console.log(input)

    return(
        <div style={{
            position:'absolute',
            backgroundColor:'rgba(0,0,0,0.65)',
            zIndex:10,
            height:'100vh',
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
            <div style={{marginTop:25, display:'flex', width:'50%',justifyContent:'space-around'  }}>
                <button style={{backgroundColor:'black',color:'white',borderRadius:5 ,border:'1px solid black'}} 
                className='primaryButton' type='submit' 
                disabled={errors.name || errors.password || errors.email}>Register</button>
                <button style={{backgroundColor:'white',color:'black',borderRadius:5 ,border:'1px solid black'}} 
                className='secondaryButton' onClick={() => dispatch(closeModal())} >Close</button>
            </div>
        
        </form>
        </div>
        
    </div>
    )


}