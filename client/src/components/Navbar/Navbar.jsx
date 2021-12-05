import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/actions/index.js';
import { Link } from 'react-router-dom';
import marca from './img/logo.png';
import { logout } from '../../redux/actions/index.js';
import {ShoppingCart} from '@material-ui/icons';
import {Badge} from '@material-ui/core';
import './Navbar.css';


function Navbar() {
    const cart = useSelector(state => state.cart)
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => setClick(!click);
    const user = useSelector(state => state.user)
    // const usuario = JSON.parse(JSON.stringify(user)) || ''
    const [cartItemsNumber,setCartItemsNumber] = useState(0)


    ///// TO FIX 
    // useEffect(() => {
    //   setCartItemsNumber(JSON.stringify(cart.length).length)
    // }, [JSON.stringify(cart)]) // no triggerea sino porque compara arrays por referencia no por valor (deep equality)


    return (
        <>
      <nav className='navbar'>
        <div className='navbar_container'>
            <div className='navbar_icon' >
            <Link to='/'><img src={marca} alt=""/></Link >
            
            </div>
          <div className='menu_icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav_menu active' : 'nav_menu'}>		
        
        { 
          (user && !user.error && JSON.stringify(user).length>2) ? <>
         <li> Hola {`${user.name?.split(' ')[0]}`} 😀! </li>
         { user.role===2 ?
         <li>    <Link to='/adminCPanel'> AdminControlPanel</Link> </li> : 
         <li> <Link className='nav_links' to='/myAccount'> My Account </Link> </li>
         }
        <li 
        className='nav_links' 
        onClick={() => dispatch(logout())}
        > <Link to='/'> Logout</Link>
       </li></>
        :
            <>
          
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
            </>
          }
            <li><Link className='nav_links' to='/catalogue'>Catalogue</Link ></li>
            <li >
              <Link
              to='/about'
              className='nav_links'
              >
                About us
              </Link>
            </li>
            <li>
            <Link
              to='/cart'
              className='nav_links'
              >
                <Badge badgeContent={cart?.length} color='secondary'>
                  <ShoppingCart fontSize='large' color='primary' />
                </Badge>
              </Link>
              </li></ul>
        </div>
        
      </nav>
    </>
    )
}

export default Navbar
