import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/actions/index.js';
import { Link } from 'react-router-dom';
import marca from './img/logo.png';
import './Navbar.css';


function Navbar() {
  
    const [click, setClick] = useState(false);
    const dispatch = useDispatch();
    const handleClick = () => setClick(!click);


    
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

            <li><Link className='nav_links' to='/catalogue'>Catalogue</Link ></li>
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
            
            <li >
              <Link
              to='/about'
              className='nav_links'
              >
                About us
              </Link>
            </li>
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
