export function openModal(payload) {
	return { type: 'OPEN_MODAL', payload };
}

export function closeModal() {
	return { type: 'CLOSE_MODAL' };
}

export function getShoes() {
	return async function (dispatch) {
		await fetch('http://localhost:3001/data.json')
			.then(res => res.json())
			.then(response => {
				dispatch({ type: 'GET_SHOES', payload: response });
			});
	};
}

export function filterSize(size) {
	return {
		type: 'FILTER_SIZE',
		payload: size,
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
