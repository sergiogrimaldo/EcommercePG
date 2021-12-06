import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {shopingShoes} from '../../redux/actions/index';
import styles from './Address.module.css';

function AddressForm({nextStep}) {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name:'',
        lastName:'',
        address:'',
        phone:'',
        email:'',
    })

    function onHandleChange (e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }

    function onHandleSubmit(e){   
        e.preventDefault(); 
        dispatch(shopingShoes(input))
        setInput({
            name:'',
            lastName:'',
            address:'',
            phone:'',
            email:'',
        })
        nextStep();
    }
    return (
        <div className={styles.formContainer}>
            <div className={styles.h1}>
                <h1>Shipping Address</h1>
            </div>
            
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <label className={styles.label} htmlFor='name'>name*:</label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your name'
                        id='name'
                        value={input.name}
                        name='name'
                        onChange={onHandleChange}
                    />
                </div>
                <label className={styles.label} htmlFor='lastName'>lastName*:</label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your lastName'
                        id='lastName'
                        value={input.lastName}
                        name='lastName'
                        onChange={onHandleChange}
                    />
                </div>
                <label className={styles.label} htmlFor='address'>address*:</label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your address'
                        id='address'
                        value={input.address}
                        name='address'
                        onChange={onHandleChange}
                    />
                </div>
                <label className={styles.label} htmlFor='phone'>phone*:</label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your phone'
                        id='phone'
                        value={input.phone}
                        name='phone'
                        onChange={onHandleChange}
                    />
                </div>
                <label className={styles.label} htmlFor='email'>email*:</label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your email'
                        id='email'
                        value={input.email}
                        name='email'
                        onChange={onHandleChange}
                    />
                </div>
                <div>
                    <Link to='/cart'>
                        <button>Back to the Checkout</button>
                    </Link>
                </div>
                <div>
                    <button type="submit">Next</button>
                </div>
            </form>
        </div>
        
    )
}

export default AddressForm
