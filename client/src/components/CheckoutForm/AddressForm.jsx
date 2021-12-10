import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom';
import {shopingShoes} from '../../redux/actions/index';
import Validate from './Validate';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheckCircle, faTimesCircle ,faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import styles from './Address.module.css';
import {
    MenssageError,
    StylError,
    Label,
    CenterButton,
    Boton,
} from './AddressFormElements';

function AddressForm({nextStep}) {
    const dispatch = useDispatch();
    const [errors,setErrors] = useState({})
    const [formularioValido,setFormularioValido] = useState(true);
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
        setErrors(Validate({
            ...input,
            [e.target.name]:e.target.value,
        }));
    }

    function onHandleSubmit(e){   
        e.preventDefault();
        if(errors.hasOwnProperty('name')  || errors.hasOwnProperty('lastName') || errors.hasOwnProperty('address') || errors.hasOwnProperty('phone')  || errors.hasOwnProperty('email')){
            setFormularioValido(false);
        }else{
            setFormularioValido(true);
            //dispatch(shopingShoes(input))
            setInput({
                name:'',
                lastName:'',
                address:'',
                phone:'',
                email:'',
            })
            nextStep();
        } 
    }
    return (
        <div className={styles.formContainer}>
            <div className={styles.h1}>
                <h1>Shipping Address</h1>
            </div>
            
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <Label className={styles.label} htmlFor='name' valido={errors.name}>name*:</Label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your name'
                        id='name'
                        value={input.name}
                        name='name'
                        onChange={onHandleChange}
                        valido={errors.name}
                    />
                    {
                        errors.name && (
                            <StylError valido={errors.name}>{errors.name}</StylError>
                        )
                    }
                </div>
                <Label className={styles.label} htmlFor='lastName' valido={errors.lastName}>lastName*:</Label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your lastName'
                        id='lastName'
                        value={input.lastName}
                        name='lastName'
                        onChange={onHandleChange}
                        valido={errors.lastName}
                    />
                     {
                        errors.lastName && (
                            <StylError valido={errors.lastName}>{errors.lastName}</StylError>
                        )
                    }
                </div>
                <Label className={styles.label} htmlFor='address' valido={errors.address}>address*:</Label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your address'
                        id='address'
                        value={input.address}
                        name='address'
                        onChange={onHandleChange}
                        valido={errors.address}
                    />
                    {
                        errors.address && (
                            <StylError valido={errors.address}>{errors.address}</StylError>
                        )
                    }
                </div>
                <Label className={styles.label} htmlFor='phone' valido={errors.phone}>phone*:</Label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your phone'
                        id='phone'
                        value={input.phone}
                        name='phone'
                        onChange={onHandleChange}
                        valido={errors.phone}
                    />
                    {
                        errors.phone && (
                            <StylError valido={errors.phone}>{errors.phone}</StylError>
                        )
                    }
                </div>
                <Label className={styles.label} htmlFor='email' valido={errors.email}>email*:</Label>
                <div>
                    <input
                        type='text'
                        placeholder='enter your email'
                        id='email'
                        value={input.email}
                        name='email'
                        onChange={onHandleChange}
                        valido={errors.email}
                    />
                    {
                        errors.email && (
                            <StylError valido={errors.email}>{errors.email}</StylError>
                        )
                    }
                </div>
                <div>
                    <Link to='/cart'>
                        <button>Back to the Checkout</button>
                    </Link>
                </div>
                {formularioValido === false && <MenssageError>
                        <p><FontAwesomeIcon icon={faExclamationTriangle}/><b>Error:</b><b>Por favor complete los campos marcados con * correctamente.</b></p>
                    </MenssageError>}
                {/* <div>
                    <button type="submit">Next</button>
                </div> */}
                <CenterButton>
                        { input.name !== "" && <Boton type='submit'>Next</Boton>}
                </CenterButton>
            </form>
        </div>
        
    )
}

export default AddressForm
