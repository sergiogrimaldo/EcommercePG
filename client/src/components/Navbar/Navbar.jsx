import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal, getOrders, clearCart, update, clearWishlist } from '../../redux/actions/index.js';
import { Link } from 'react-router-dom';
import marca from './img/logo.png';
import { logout } from '../../redux/actions/index.js';
import {ShoppingCart} from '@material-ui/icons';
import {Badge} from '@material-ui/core';
import './Navbar.css';
import { useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {useHistory} from 'react-router-dom'
import {Cover} from '../Home/Cover/Cover'


function Navbar() {
    const cart = useSelector(state => state.cart)
    const history = useHistory()
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => setClick(!click);
    const user = useSelector(state => state.user)
    // const usuario = JSON.parse(JSON.stringify(user)) || ''
    const [cartItemsNumber,setCartItemsNumber] = useState(0)


    useEffect(async () => {
      await dispatch(getOrders({email:user?.email}))
    },[])
    ///// TO FIX 
    // useEffect(() => {
    //   setCartItemsNumber(JSON.stringify(cart.length).length)
    // }, [JSON.stringify(cart)]) // no triggerea sino porque compara arrays por referencia no por valor (deep equality)

    const handleLike1 = function (){
      if (!(user.email)){
        dispatch(openModal('login'))
      }
      else {
        history.push('/wishlist')
      }
    }


    const handleLogout = function () {
      dispatch(logout())
      dispatch(clearCart())
      dispatch(clearWishlist())
      dispatch(update())
    }
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
        onClick={() => handleLogout()}
        > <Link to='/home' onClick={() => window.scrollTo(0, 0)}> Logout</Link>
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
                <Badge badgeContent={cart &&  [].concat(cart).reduce((accumulator, currentValue) => accumulator + currentValue.cuantity,0)} color='secondary'>
                  <ShoppingCart fontSize='large' color='primary' />
                </Badge>
              </Link>
              </li>
              <li>
              <FontAwesomeIcon style={{cursor:'pointer'}} size='lg'  color='red' icon={faHeart} onClick={ () => handleLike1()}/> 
              </li>
              </ul>
        </div>
        
      </nav>
    </>
    )
}

export default Navbar
