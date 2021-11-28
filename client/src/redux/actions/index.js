import axios from 'axios';
import setAuthorizationToken from '../../utils/setAutToken';
import jwt from 'jsonwebtoken'

export function logIn(payload){
	return async dispatch => {
		const res = await axios.post('http://localhost:3001/login/autenticar', payload);
		console.log(res)
		const name = res.data.name;
		const email = res.data.email;
		const token = res.data.token;
		localStorage.setItem('jwtToken', token);
		setAuthorizationToken(token);
		dispatch(setCurrentUser({
			email: email,
			name: name,
		}))

		// dispatch(setCurrentUser(jwt.decode(token)))
	}
}
//el decode token es el user

export function setCurrentUser(user){
	return {
		type: 'SET_CURRENT_USER',
		user: user,
	}
}

export function login(payload){
	return {
		type: 'LOGIN',
		payload: payload,
	}
}

export function logout(){
	return {
		type: 'LOGOUT',
	}
}

export function openModal(payload) {
	return { type: 'OPEN_MODAL', payload };
}

export function closeModal() {
	return { type: 'CLOSE_MODAL' };
}

export function getShoes() {
	return async function (dispatch) {
		await fetch('http://localhost:3000/data.json')
			.then(res => res.json())
			.then(response => {
				dispatch({ type: 'GET_SHOES', payload: response });
			});
	};
}

export function addToCart(payload) {
	return {
		type: 'ADD_TO_CART',
		payload: payload,
	};
}
export function removeFromCart(payload) {
	return {
		type: 'REMOVE_FROM_CART',
		payload: payload,
	};
}


export function filterSize(size) {
	return {
		type: 'FILTER_SIZE',
		payload: size,
	};
}

export function setFilterBrands(brand) {
	return {
		type: 'SET_FILTER_BRANDS',
		payload: brand,
	};
}

export function filterPrice(price) {
	return {
		type: 'FILTER_PRICE',
		payload: price,
	};
}

export function setPage(payload) {
	return {
		type: 'SET_PAGE',
		payload: payload,
	};
}



export function search(payload){
	return {
		type: 'SEARCH',
		payload: payload
	}
}

export function postUser(payload){
    return async function () {
        const res = await axios.post('http://localhost:3001/users', payload);
		console.log(payload)
        return res;
    }
}
