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
    ValidateIcon,
    InputContainer,
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
    }
    return (
        <div className={styles.formContainer}>
            <div className={styles.h1}>
                <h1>Shipping Address</h1>
            </div>
            
            <form className={styles.form} onSubmit={onHandleSubmit}>
                <Label  htmlFor='name' valido={errors.name}>name*:</Label>
                <InputContainer>
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
                        input.name && <ValidateIcon
                            icon={errors.name === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.name}
                        />
                    }
                    {
                        errors.name && (
                            <StylError valido={errors.name}>{errors.name}</StylError>
                        )
                    }
                    
                </InputContainer>
                    
            
                <Label  htmlFor='lastName' valido={errors.lastName}>lastName*:</Label>
                <InputContainer>
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
                        input.lastName && <ValidateIcon
                            icon={errors.lastName === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.lastName}
                        />
                    }
                    {
                        errors.lastName && (
                            <StylError valido={errors.lastName}>{errors.lastName}</StylError>
                        )
                    }
                </InputContainer>

                <Label  htmlFor='address' valido={errors.address}>address*:</Label>
                <InputContainer>
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
                        input.address && <ValidateIcon
                            icon={errors.address === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.address}
                        />
                    }
                    {
                        errors.address && (
                            <StylError valido={errors.address}>{errors.address}</StylError>
                        )
                    }
                </InputContainer>
                
                <Label  htmlFor='phone' valido={errors.phone}>phone*:</Label>
                <InputContainer>
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
                        input.phone && <ValidateIcon
                            icon={errors.phone === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.phone}
                        />
                    }
                    {
                        errors.phone && (
                            <StylError valido={errors.phone}>{errors.phone}</StylError>
                        )
                    }
                </InputContainer>
                
                <Label  htmlFor='email' valido={errors.email}>email*:</Label>
                <InputContainer>
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
                        input.email && <ValidateIcon
                            icon={errors.email === undefined ? faCheckCircle:faTimesCircle}
                            valido={errors.email}
                        />
                    }
                    {
                        errors.email && (
                            <StylError valido={errors.email}>{errors.email}</StylError>
                        )
                    }
                </InputContainer>
                
                {formularioValido === false && <MenssageError>
                        <p><FontAwesomeIcon icon={faExclamationTriangle}/><b>Error:</b><b> Complete los campos *.</b></p>
                    </MenssageError>}
                
                <Link to='/cart'> <Boton>Back </Boton></Link>
                <CenterButton>
                        { input.name !== "" && <Boton type='submit'>Next</Boton> }
                </CenterButton>
            </form>
        </div>
        
    )
}

export default AddressForm