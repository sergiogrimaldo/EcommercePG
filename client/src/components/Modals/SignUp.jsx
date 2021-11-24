import { useDispatch } from "react-redux";
import { closeModal } from "../../redux/actions";

export default function SignUp(){
    const dispatch = useDispatch()

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
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',}}>            
                <label style={{textAlign:"center"}} for='username'>Username:</label><input id='username' placeholder='type your username'></input>
                <label style={{textAlign:"center"}} for='password'>Password:</label><input type='password' id='password' placeholder="type your password"></input>
                <label style={{textAlign:"center"}} for='repeatPassword'>Repeat password:</label><input type='password' id='repeatPassword' placeholder="type your password again" ></input>
            </div>
            <div style={{marginTop:25, display:'flex', width:'50%',justifyContent:'space-around'  }}>
                <button style={{backgroundColor:'black',color:'white',borderRadius:5 ,border:'1px solid black'}} className='primaryButton' type='submit'>Register</button>
                <button style={{backgroundColor:'white',color:'black',borderRadius:5 ,border:'1px solid black'}} className='secondaryButton' onClick={() => dispatch(closeModal())} >Close</button>
            </div>
        </div>
    </div>
    )


}