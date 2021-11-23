import Searchbar from '../Searchbar/Searchbar.jsx'
import { GoogleLogin } from 'react-google-login';

export default function Header(){

    const responseGoogle = (response) => {
        console.log(response)
      }

    return(
        <header style={{
            zIndex:0,
            borderBottom:'1px solid rgba(0,0,0,0.05)',
            padding:'20px',
            paddingTop:0,
            paddingBottom:0,
            display:'flex',
            backgroundColor:'white',
            alignContent:'center',
            alignItems:'center',
            justifyContent:'space-between',
        }}>
            <h1>ZapAPP</h1>
            <div>
               
                <ul style={{
                    cursor:'pointer',
                    listStyle:'none',
                    display:'flex'}}>
                     <Searchbar/>
                    <li className='selected' style={{margin:10}}>Home</li>
                    <li style={{margin:10}}> Login </li>
                    <li style={{margin:10}}> Carrito </li>
                        {/* inserto el login con el usuario de google extraido de la documentacion de react-google-login */}
                        <br /> <br />
                        <GoogleLogin 
                        clientId="535679678854-l50v2fpt6e7ag1mhjtc5p1aa1pgv0kcb.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />, 
                </ul>
            </div>
        </header>
    )
}