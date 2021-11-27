// import {

// } from "../constants";

const initialState = {
	shoes: [],
	filteredShoes: [],
	brands: [],
    modalBuyDetails: {},
	modal: '',
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_SHOES':
			return {
				shoes: action.payload,
				filteredShoes: action.payload,
			};

		case 'OPEN_MODAL':
			return {
				...state,
				modal: action.payload,
			};

            case 'OPEN_BUY_DETAILS_MODAL':
			return {
				...state,
				modalBuyDetails: action.payload,
			};

		case 'CLOSE_MODAL':
			return {
				...state,
				modal: '',
			};
		case 'GET_BRANDS':
			return {
				...state,
				brands: action.payload.map(elem => elem.brand),
			};
		case 'FILTER_BRAND': {
			if (action.payload) {
				var aux = state.filteredShoes;
				var filter = aux.filter(elem => elem.brand === action.payload);
				return {
					...state,
					shoes: filter,
				};
			}
			break;
		}

		default:
			return state;
	}
}

export default rootReducer;
