// import {

// } from "../constants";

const initialState = {
	shoes: [],
	filteredShoes: [],
	brands: [],
	sizes: [],
	modal: '',
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_SHOES':
			return {
				shoes: action.payload,
				filteredShoes: action.payload,
				brands: action.payload.map(elem => elem.brand),
				sizes: action.payload
					.map(elem => elem.resellPrices) // mapping data's resellPrices properties
					.filter(elem => elem) // filtering undefined ones out
					.map(elem => Object.keys(elem.flightClub)) // taking all sizes
					.flat(Infinity),
			}; // flattening out the array

		case 'OPEN_MODAL':
			return {
				...state,
				modal: action.payload,
			};

		case 'CLOSE_MODAL':
			return {
				...state,
				modal: '',
			};
		case 'FILTER_BRAND': {
			if (action.payload) {
				let aux = state.filteredShoes;
				let filter = aux.filter(elem => elem.brand === action.payload);
				return {
					...state,
					shoes: filter,
				};
			}
			break;
		}
		case 'FILTER_SIZE': {
			if (action.payload) {
				let auxBrands = state.filteredShoes;
				auxBrands = auxBrands.filter(elem =>
					elem.resellPrices?.flightClub?.hasOwnProperty(action.payload)
				); // mapping data's resellPrices properties

				return {
					...state,
					shoes: auxBrands,
				};
			}
			break;
		}
		default:
			return state;
	}
}

export default rootReducer;
