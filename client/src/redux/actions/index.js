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

export function getBrands() {
	return async function (dispatch) {
		await fetch('http://localhost:3000/data.json')
			.then(res => res.json())
			.then(response => {
				dispatch({ type: 'GET_BRANDS', payload: response });
			});
	};
}

export function filterBrand(brand) {
	return {
		type: 'FILTER_BRAND',
		payload: brand,
	};
}
