import axios from 'axios';
import setAuthorizationToken from '../../utils/setAutToken';
import jwt from 'jsonwebtoken';

export function logIn(payload) {
	return async dispatch => {
		const res = await axios.post(
			'http://localhost:3001/login/autenticar',
			payload
		);
		// console.log(res)
		const name = res.data.name;
		const email = res.data.email;
		const token = res.data.token;
		localStorage.setItem('jwtToken', token);
		setAuthorizationToken(token);
		dispatch(
			setCurrentUser({
				profileObj: {
					email: email,
					givenName: name,
				},
			})
		);
		return { email };

		// dispatch(setCurrentUser(jwt.decode(token)))
	};
}
//el decode token es el user

export function sendOrderDetails(payload) {
	return async dispatch => {
		const res = await axios.post('http://localhost:3001/sendmail', payload);
		return res;
	};
}
export function setCurrentUser(user) {
	return {
		type: 'SET_CURRENT_USER',
		user: user,
	};
}

export function login(payload) {
	return {
		type: 'LOGIN',
		payload: payload,
	};
}

export function logout() {
	return {
		type: 'LOGOUT',
	};
}

export function deleteFromCart(payload) {
	return {
		type: 'DELETE_FROM_CART',
		payload: payload,
	};
}

export function openModal(payload) {
	return { type: 'OPEN_MODAL', payload };
}

export function closeModal() {
	return { type: 'CLOSE_MODAL' };
}

export function openBuyDetailsModal(payload) {
	return { type: 'OPEN_BUY_DETAILS_MODAL', payload };
}

export function getShoes() {
	return function (dispatch) {
		fetch('http://localhost:3001/shoes')
			.then(res => res.json())
			.then(respons => {
				console.log(respons);
				dispatch({
					type: 'GET_SHOES',
					payload: respons,
				});
			});
	};
}
export function getPrices() {
	return function (dispatch) {
		fetch('http://localhost:3001/prices')
			.then(res => res.json())
			.then(respons => {
				dispatch({
					type: 'GET_PRICES',
					payload: respons,
				});
			});
	};
}
export function getAvailableSizes() {
	return function (dispatch) {
		fetch('http://localhost:3001/availableSizes')
			.then(res => res.json())
			.then(respons => {
				dispatch({
					type: 'GET_AVAILABLE_SIZES',
					payload: respons,
				});
			});
	};
}
/* fetch('http://localhost:3001/Shoes')
			.then(res =>  res.json())
                .then(response => {
				dispatch({ type: 'GET_SHOES', payload: response });
			});
	}; */

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

export function search(payload) {
	return {
		type: 'SEARCH',
		payload: payload,
	};
}

export function update() {
	return {
		type: 'UPDATE',
	};
}

export function postUser(payload) {
	return async function () {
		const res = await axios.post('http://localhost:3001/users', payload);
		return res;
	};
}
