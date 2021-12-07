import React from 'react'

function Validate(input) {
    let errors = {};

    if(!input.name){
        errors.name = 'name is required';
    }else if(!/^([a-z]){3,10}/gi.test(input.name)){
        errors.name = 'El nombre debe contener entre de 3 y 10 caracteres'
    }else if(!input.lastName){
        errors.lastName = 'lastName es required'
    }else if(!/^([a-z]){3,10}/gi.test(input.lastName)){
        errors.lastName = 'el lastName debe contener mas de 3 caracteres'
    }else if(!input.address){
        errors.address = 'address is required';
    }else if(!input.phone){
        errors.phone = 'phone is required';
    }else if(!input.email){
        errors.email = 'email is required'
    }
    return errors;
}

export default Validate
