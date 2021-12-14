import axios from 'axios';
import setAuthorizationToken from '../../utils/setAutToken';
import jwt from 'jsonwebtoken';

// genera un token y manda un mail, pendendiendo el token case del body:
// post ---> localhost/users/resetpassword

//activa la cuenta con el token envíado por email en tokenGerator:
// post ---> localhost/users/resetpassword/token

export function sendActivateEmail(payload) {
	return async dispach => {
		try {
			const res = await axios.post('/users/resetpassword', payload);
			return dispach({ type: 'SEND_ACTIVATE_EMAIL', payload: res.data });
		} catch (error) {
			console.log(error);
		}
	};
}

// export function activateAccount(payload){
// 	return async dispach => {
// 		try {
// 			const res = await axios.post(`/users/resetpassword/${token}`, payload)
// 			return dispach({ type: 'ACTIVATE_ACCOUNT', payload: res.data })
// 		} catch (error) {
// 			console.log(error)
// 		}
// 	}
// }

export function getOrders(payload) {
	return async dispatch => {
		try {
			const res = await axios.post('/orders/getorders', payload);
			return dispatch({ type: 'GET_ALL_ORDERS', payload: res.data });
		} catch (err) {
			console.log(err);
		}
	};
}

export function changeRol(payload) {
	return async dispach => {
		try {
			const res = await axios.patch(`/users/` + payload.id, { email: payload.email });
			return dispach({
				type: 'CHANGE_ROL',
				payload: res.data,
			});
		} catch (err) {
			console.log(err);
		}
	};
}

export function deleteUser(payload) {
	return async dispatch => {
		try {
			const res = await axios.delete(`/users/` + payload);
			return dispatch({ type: 'DELETE_USER', payload: payload });
		} catch (err) {
			console.log(err);
		}
	};
}

export function setOrderStatus(payload) {
	return async dispatch => {
		try {
			const res = await axios.patch(`/orders/${payload.id}`, { email: payload.email, status: payload.status });
			return dispatch({ type: 'SET_ORDER_STATUS' });
		} catch (err) {
			console.log(err);
		}
	};
}

export function getOrderDetails(payload) {
	return async dispatch => {
		try {
			const res = await axios.post(`/orders/getorders/${payload.id}`, { email: payload.email });
			return dispatch({ type: 'GET_ORDER_DETAILS', payload: res.data });
		} catch (err) {
			console.log(err);
		}
	};
}

export function logIn(payload) {
	return async dispatch => {
		const res = await axios.post('/login/autenticar', payload);

		//const name = res.data.name;
		//const email = res.data.email;
		const token = res.data.token;
		//		const role = res.data.role
		const id = res.data.id;
		localStorage.setItem('jwtToken', token);
		setAuthorizationToken(token);
		dispatch(
			setCurrentUser({
				token: token,
				email: jwt.decode(token).email,
				name: jwt.decode(token).name,
				role: jwt.decode(token).role,
				id: jwt.decode(token).id,
			})
		);

		return { email: jwt.decode(token).email, name: jwt.decode(token).name, role: jwt.decode(token).role, id: jwt.decode(token).id };

		// dispatch(setCurrentUser(jwt.decode(token)))
	};
}
//el decode token es el user

export function googleLogIn(payload) {
	return async dispatch => {
		const res = await axios.post('/login/googleAutenticar', payload);
		const name = res.data.name;
		const email = res.data.email;
		const token = res.data.token;
		const role = res.data.role;
		const id = res.data.id;
		localStorage.setItem('jwtToken', token);
		setAuthorizationToken(token);
		dispatch(
			setCurrentUser({
				token: token,
				email: jwt.decode(token).email,
				name: jwt.decode(token).name,
				role: role,
				id: id,
			})
		);
		return { email: jwt.decode(token).email, name: jwt.decode(token).name, role: role, id: id };
		// dispatch(setCurrentUser(jwt.decode(token)))
	};
}

export function clearCart() {
	return {
		type: 'CLEAR_CART',
	};
}

export function clearWishlist() {
	return {
		type: 'CLEAR_WISHLIST',
	};
}

export function getWishList(payload) {
	return async dispatch => {
		if(payload.email){
		const res = await axios.post(`/users/getWishlist`, payload)
		console.log(res.data,'res')
		return dispatch({
			type: 'GET_WISHLIST',
			payload: res.data,
		});
	}
	};
}



export function addToWishList(payload) {
	return async dispatch => {
		const res = await axios.post(`/users/wishlist`, payload)
		console.log(res.data,'res')
		return dispatch({
			type: 'ADD_WISHLIST',
			payload: res.data,
		});
	};
}
export function deleteFromWishList(payload) {
	return async dispatch => {
		const res = await axios.post(`/users/deleteWishlist`, payload)
		console.log(res.data,'res')
		return dispatch({
			type: 'DELETE_WISHLIST',
			payload: res.data,
		});
	};
}


export function makeBuyOrder(payload) {
	return async dispatch => {
		const res = await axios.post('/orders', payload);
		return dispatch({
			type: 'MAKE_BUY_ORDER',
			payload: res.data,
		});
	};
}

export function sendOrderDetails(payload) {
	return async dispatch => {
		const res = await axios.post('/sendmail', payload);
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
	alert('Are you sure?');
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
		axios.get('/shoes').then(respons => {
			dispatch({
				type: 'GET_SHOES',
				payload: respons.data,
			});
		});
	};
}
export function getPrices() {
	return function (dispatch) {
		axios.get('/prices').then(respons => {
			dispatch({
				type: 'GET_PRICES',
				payload: respons.data,
			});
		});
	};
}
export function getAvailableSizes() {
	return function (dispatch) {
		axios.get('/availableSizes').then(respons => {
			dispatch({
				type: 'GET_AVAILABLE_SIZES',
				payload: respons.data,
			});
		});
	};
}

export function getReviews() {
	return function (dispatch) {
		axios.get('/reviews').then(respons => {
			dispatch({
				type: 'GET_REVIEWS',
				payload: respons.data,
			});
		});
	};
}
export function getReviewsFromUser(userId) {
	return function (dispatch) {
		axios.get(`/reviews/${userId}`).then(respons => {
			dispatch({
				type: 'GET_REVIEWS_FROM_USER',
				payload: respons.data,
			});
		});
	};
}
export function postReview(payload) {
	return function (dispatch) {
		console.log(payload);
		axios.post(`/reviews`, payload).then(respons => {
			dispatch({
				type: 'GET_REVIEWS_FROM_USER',
				payload: respons.data,
			});
		});
	};
}
/* export function deleteReviews(reviewId) {
	return function (dispatch) {
		axios.get(`/reviews/user/${reviewId}`)
			.then(res => res.json())
			.then(respons => {
				dispatch({
					type: 'GET_REVIEWS_FROM_USER',
					payload: respons,
				});
			});
	};
} */
/* axios.get('/Shoes')
			.then(res =>  res.json())
                .then(response => {
				dispatch({ type: 'GET_SHOES', payload: response });
			});
	}; */

export function addToCart(payload) {
	console.log('soyy payload de action', payload);
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

export function changeItemCuantity(payload) {
	return {
		type: 'CHANGE_ITEM_CUANTITY',
		payload: payload,
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

export function shopingShoes(data) {
	return {
		type: 'SHOPING_SHOES',
		payload: data,
	};
}

export function paymentMessage(data) {
	return {
		type: 'PAYMENT_MESSAGE',
		payload: data,
	};
}

export function deleteId(id) {
	return {
		type: 'DELETE_ID',
		payload: id,
	};
}

export function postUser(payload) {
	return async function () {
		try {
			const res = await axios.post('/users', payload);
			return res;
		} catch (error) {
			console.log(error);
		}
	};
}

export function getUsers() {
	return async function (dispach) {
		try {
			const res = await axios.get('/users');
			console.log(res);
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
			var ShoeDetails = await axios.get(`/shoes/${id}`);
			return dispatch({
				type: 'GET_DETAILS',
				payload: ShoeDetails.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}

export function postNewShoe(payload) {
	return async function (dispatch) {
		axios.post(`/shoes`, payload).then(r => {
			dispatch({ type: 'POST_NEW_SHOE', payload: r.data });
		});
	};
}

export function putNewShoe(id, data) {
	return async function (dispatch) {
		axios.put(`/shoes/${id}`, data).then(r => {
			dispatch({ type: 'PUT_NEW_SHOE', payload: r.data });
		});
	};
}

export function getBrands() {
	return async function (dispatch) {
		axios.get(`/brands`).then(r => {
			dispatch({ type: 'GET_BRANDS', payload: r.data });
		});
	};
}

export function deleteShoe(id) {
	return async function (dispatch) {
		axios.delete(`/shoes/${id}`).then(r => {
			dispatch({ type: 'DELETE_SHOE', payload: r.data });
		});
	};
}

export function clearShoeDetails() {
	return {
		type: 'CLEAR_SHOE_DETAILS',
		payload: [],
	};
}
