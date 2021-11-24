import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/actions/index.js';

import './Navbar.css';


function Navbar() {
  
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => setClick(!click);


    
    return (
        <>
      <nav className='navbar'>
        <div className='navbar_container'>
            <div className='navbar_icon'>
            <h1>CACTUS <i class="fas fa-shoe-prints"></i> SHOES</h1>
            </div>
          <div className='menu_icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav_menu active' : 'nav_menu'}>			

            <li 
             className='nav_links'
            >Catalogue</li>
            <li 
             className='nav_links' 
             onClick={() => dispatch(openModal('signUp'))}
             > Register 
            </li>
            <li 
             className='nav_links'
             onClick={() => dispatch(openModal('login'))}
            > Login 
            </li>
            {/*<li className='nav_links'>
                <GoogleLogin 
                    clientId="535679678854-l50v2fpt6e7ag1mhjtc5p1aa1pgv0kcb.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    />
    </li>*/}
            <li 
             className='nav_links'
            >About us</li>
            <li 
             className='nav_links'
            >Carrito</li>
          </ul>
        </div>
      </nav>
    </>
    )
}

export default Navbar
