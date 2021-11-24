import React from 'react';
import Searchbar from '../Searchbar/Searchbar.jsx';
import FilterBrand from '../FilterBrand/FilterBrand.jsx';
import Navbar from '../Navbar/Navbar.jsx';
//import { GoogleLogin } from 'react-google-login';


export default function Header({ data }) {

    //const responseGoogle = (response) => {
    //  console.log(response)
    //}

	return (
		<>
			<Navbar/>
			<header
				style={{
					zIndex: 0,
					borderBottom: '1px solid rgba(0,0,0,0.05)',
					padding: '20px',
					paddingTop: 0,
					paddingBottom: 0,
					display: 'flex',
					backgroundColor: 'white',
					alignContent: 'center',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<div>
					<ul
						style={{
							cursor: 'pointer',
							listStyle: 'none',
							display: 'flex',
						}}>
						<Searchbar />
						<FilterBrand data={data} />
						{/* <li className='selected' style={{ margin: 10 }}>
							Home
						</li>
						<li style={{ margin: 10 }} onClick={() => dispatch(openModal('signUp'))}> Register </li>
						<li style={{ margin: 10 }} onClick={() => dispatch(openModal('login'))} > Login </li>
						<li style={{ margin: 10 }}> Carrito </li> */}
			{/* inserto el login con el usuario de google extraido de la documentacion de react-google-login */}
				{/* <GoogleLogin 
				clientId="535679678854-l50v2fpt6e7ag1mhjtc5p1aa1pgv0kcb.apps.googleusercontent.com"
				buttonText="Login"
				onSuccess={responseGoogle}
				onFailure={responseGoogle}
				cookiePolicy={'single_host_origin'}
				/>,  */}
					</ul>
				</div>
			</header>
		</>
	);
}

