import axios from 'axios';

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

export function search(payload){
	return {
		type: 'SEARCH',
		payload: payload
	}
}

export function update(){
	return {
		type: 'UPDATE',
	}
}

export function postUser(payload){
    return async function () {
        const res = await axios.post('http://localhost:3001/users', payload);
        return res;
    }
}
