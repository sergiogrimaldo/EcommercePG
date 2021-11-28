import { useDispatch } from "react-redux";
import { useState } from "react";
import { closeModal } from "../../redux/actions";
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router";
import { login, logIn, setCurrentUser } from "../../redux/actions";


export default function Login(){
    const dispatch = useDispatch()
    const history = useHistory()
    const responseGoogle = async (response) => {
        await dispatch(login(response))
        dispatch(closeModal())
        setTimeout(() => {
            history.go(0)
        }, 500);
      }


    const [input, setInput] = useState(
        {
            profileObj:{
                // givenName:"",
                email:"",
                password:"",
            }
        }
    )
    
    function handleChange(e){
        // console.log(input)
        setInput({
            ...input,
            [e.target.id]: e.target.value,
        })
    }



    function handleSubmit(e){
        e.preventDefault();
        // dispatch(setCurrentUser(input));
        dispatch(logIn({email: input.profileObj.email, password: input.profileObj.password}));
        alert('Welcome');
        setInput({
            profileObj:{
                // givenName:"",
                email:"",
                password:"",
            }
        })
        dispatch(closeModal())
    }

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

    <h1 style={{marginTop:0}}>LOGIN</h1>
        <form onSubmit={e => handleSubmit(e)}>

            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',}}>            
                <label style={{textAlign:"center"}} for='username'>Email:</label>
                <input 
                id='email' 
                // value={input.profileObj.email}
                placeholder='type your email'
                onChange={e => handleChange(e)}
                ></input>
                {/* <label style={{textAlign:"center"}} for='username'>Username:</label>
                <input 
                id='givenName'
                // value={input.profileObj.givenName}   
                placeholder='type your username or email'
                // error={errors.identifier}
                onChange={e => handleChange(e)}
                ></input> */}
                <label style={{textAlign:"center"}} for='password'>Password:</label>
                <input 
                type='password' 
                id='password' 
                // value={input.profileObj.password}  
                placeholder="type your password"
                // error={errors.password}
                onChange={e => handleChange(e)}
                ></input>
            </div>

            <div style={{marginTop:25, display:'flex', width:'50%',justifyContent:'space-around'  }}>
            
            <button 
            style={{backgroundColor:'black',color:'white',borderRadius:5 ,border:'1px solid black'}} 
            className='primaryButton' 
            type='submit'
            >Login</button>

            <button 
            style={{backgroundColor:'white',color:'black',borderRadius:5 ,border:'1px solid black'}} 
            className='secondaryButton' 
            onClick={() => dispatch(closeModal())} 
            >Close</button>

            </div>

        </form>    
                
                <GoogleLogin 
                    clientId="535679678854-l50v2fpt6e7ag1mhjtc5p1aa1pgv0kcb.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    />
            
        </div>
    </div>
    )


}