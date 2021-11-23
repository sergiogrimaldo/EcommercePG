import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {react} from 'react'
import { GoogleLogin } from 'react-google-login';


function App() {

  const responseGoogle = (response) => {
    console.log(response)
  }

  return (
    <BrowserRouter>
    <div className="App">
    {/* inserto el login con el usuario de google extraido de la documentacion de react-google-login */}
    <br /> <br />
    <GoogleLogin 
    clientId="535679678854-l50v2fpt6e7ag1mhjtc5p1aa1pgv0kcb.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
      <h1>App in progress</h1>
    </div>
    </BrowserRouter>
  );
}

export default App;
