import axios from 'axios';
import setAuthorizationToken from '../../utils/setAutToken';
import jwt from 'jsonwebtoken';

export function logIn(payload) {
	return async dispatch => {
		const res = await axios.post('http://localhost:3001/login/autenticar', payload);

		const name = res.data.name;
		//const email = res.data.email;
		const token = res.data.token;
        const id = res.data.id;
		localStorage.setItem('jwtToken', token);
		setAuthorizationToken(token);
		dispatch(
			setCurrentUser({
				token: token,
				email: jwt.decode(token).email,
				name,
                id
			})
		);

		return { email: jwt.decode(token).email, name: jwt.decode(token).name };

		// dispatch(setCurrentUser(jwt.decode(token)))
	};
}
//el decode token es el user

export function googleLogIn(payload) {
	return async dispatch => {
		const res = await axios.post('http://localhost:3001/login/googleAutenticar', payload);

		const name = res.data.name;
		const email = res.data.email;
        const id = res.data.id;

		const token = res.data.token;
		localStorage.setItem('jwtToken', token);
		setAuthorizationToken(token);
		dispatch(
			setCurrentUser({
				email: email,
				name: name,
                id: id,
			})
		);
		return { email: email, name: name, id: id };

		// dispatch(setCurrentUser(jwt.decode(token)))
	};
}

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

export function getReviews() {
	return function (dispatch) {
		fetch("http://localhost:3001/reviews")
			.then(res => res.json())
			.then(respons => {
				dispatch({
					type: 'GET_REVIEWS',
					payload: respons,
				});
			});
	};
}
export function getReviewsFromUser(userId) {
	return function (dispatch) {
		fetch(`http://localhost:3001/reviews/${userId}`)
			.then(res => res.json())
			.then(respons => {
				dispatch({
					type: 'GET_REVIEWS_FROM_USER',
					payload: respons,
				});
			});
	};
}
export function postReview(payload) {
	return function (dispatch) {
		axios.post(`http://localhost:3001/reviews`, payload)
			.then(respons => {
				dispatch({
					type: 'GET_REVIEWS_FROM_USER',
					payload: respons.data,
				});
			});
	};
}
/* export function deleteReviews(reviewId) {
	return function (dispatch) {
		fetch(`http://localhost:3001/reviews/user/${reviewId}`)
			.then(res => res.json())
			.then(respons => {
				dispatch({
					type: 'GET_REVIEWS_FROM_USER',
					payload: respons,
				});
			});
	};
} */
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
		try {
			const res = await axios.post('http://localhost:3001/users', payload);
			return res;
		} catch (error) {
			console.log(error);
		}
	};
}

export function getUsers(payload) {
	return async function (dispach) {
		try {
			var res = await axios.get('http://localhost:3001/users');

			return dispach({
				type: 'GET_ALL_USERS',
				payload: res.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function getShoeDetails(id) {
	return async function (dispatch) {
		try {
			var ShoeDetails = await axios.get(`http://localhost:3001/shoes/${id}`);
			return dispatch({
				type: 'GET_DETAILS',
				payload: ShoeDetails.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
