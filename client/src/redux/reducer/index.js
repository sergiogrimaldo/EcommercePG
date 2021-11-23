// import {
    
// } from "../constants";

const initialState = {
    shoes: [],
    modal: '',
}

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case "OPEN_MODAL":
            return{
                ...state,
                modal: action.payload
            }

        case "CLOSE_MODAL":
            return{
                ...state,
                modal: ''
            }

        default:
            return state;
    } 
    
}

export default rootReducer;