// import {

// import {

// } from "../constants";
import isEmpty from 'lodash/isEmpty';

const initialState = {
	shoes: [],
	filteredShoes: [],
	modalBuyDetails: {},
	reviews: [],
	reviewsFromUser: [],
	brands: [],
	sizes: [],
	prices: [],
	modal: '',
	filters: [],
	currentPage: 0,
	filterBrands: [],
	filterSizes: [],
	filterPrice: 0,
	textToSearch: '',
	cart: [],
	user: {},
	isAuthenticaded: false,
	allUsers: [],
	shoeDetails: [],
	shipingShoes:[],
	paymentMessage:"",
	orders: [],
	orderDetails:[],
	getBrands: [],
};

function rootReducer(state = initialState, action) {

	switch (action.type) {
		case 'MAKE_BUY_ORDER':
			return {
				...state,
			};
		case 'CLEAR_CART':
			return {
				...state,
				cart:[]
			};

		case 'CHANGE_ROL':
			return {
				...state,
				allUsers: action.payload.sort((a,b) => b.createdAt > a.createdAt? -1 : 1)
			}
		case 'DELETE_USER':
			return {
				...state,
				allUsers: state.allUsers.filter( user => user.id != action.payload)
			}
			
		case 'SET_ORDER_STATUS':
			return {
				...state
			}
		case 'GET_ALL_ORDERS':
			return {
				...state,
				orders: action.payload
			}

		case 'GET_ORDER_DETAILS':
			return {
				...state,
				orderDetails: action.payload
			}

		case 'GET_ALL_USERS':
			return {
				...state,
				allUsers: action.payload,
			};

		case 'SEND_ORDER_DETAILS':
			return {
				...state,
			};

		case 'SET_CURRENT_USER':
			return {
				...state,
				isAuthenticaded: !isEmpty(action.user),
				user: action.user,
			};

		case 'DELETE_FROM_CART':
			return {
				...state,
				cart: state.cart.filter(item => item.name != action.payload),
			};

		// case 'SEARCH':
		// 	var aux = state.filteredShoes;
		// 	if (action.payload.length > 0) {
		// 		return {
		// 			...state,
		// 			shoes: aux.filter(elem => elem.shoeName.toLowerCase().includes(action.payload.toLowerCase())),
		// 		};
		// 	} else {
		// 		return {
		// 			...state,
		// 			shoes: aux,
		// 		};
		// 	}


		case 'SEARCH':
			return {
				...state,
				textToSearch: action.payload,
			}

		case 'LOGIN':
			return {
				...state,
				user: action.payload,
			};

		case 'OPEN_BUY_DETAILS_MODAL':
			return {
				...state,
				modalBuyDetails: action.payload,
			};

		case 'LOGOUT':
			return {
				...state,
				user: {},
				reviewsFromUser: [],
			};

		case 'CHANGE_ITEM_CUANTITY':
			state.cart.map(item => {
				if (item.name == action.payload.name) {
					return (item.cuantity = action.payload.cuantity);
				}} )
			return ({...state});
			
		case 'ADD_TO_CART':

			console.log(action.payload)
			// if (state.cart.length){
            //     state.cart.forEach((shoe) => shoe.id == action.payload.id  ? shoe.cuantity++ :
            //     state.cart(action.payload)
            //     )
            // } else {
            //     state.cart.push(action.payload)
            // }

			let addItem = true

			state.cart &&
				state.cart.map(item => {
					if (item.name == action.payload.name) {
						addItem = false
						return (item.cuantity = item.cuantity + 1 || 1);
					} 
				});


			addItem== true && state.cart.push({
				id: action.payload.id,
				stock: action.payload.stock,
				image: action.payload.image,
				name: action.payload.name,
				cuantity: action.payload.cuantity,
				price: action.payload.price,
				//	subtotal: action.payload.price * action.payload.cuantity,
			});

			return {
				...state,
			};
			// state.cart && state.cart.forEach(shoe => shoe.name.toLowerCase() == action.payload.name.toLowerCase() ? state.cart.cuantity + 1 :[...state.cart,action.payload] )

			// return {
			// 	...state,
			// 	cart:action.payload
			// }

		case 'REMOVE_FROM_CART':
			state.cart.map(item => {
				if (item.name == action.payload.name) {
					return (item.cuantity = item.cuantity - 1);
				} else {
					return (item.cuantity = item.cuantity);
				}
			});

			return {
				...state,
				cart: state.cart.filter(item => item.cuantity > 0),
			};

		case 'GET_SHOES':
			return {
				...state,
				shoes: action.payload,
				filteredShoes: action.payload,
				brands: action.payload.map(elem => elem.brand.name),
				/* sizes: [...new Set(action.payload
                    .map((elem) => elem.resellPrices) // mapping data's resellPrices properties
                    .filter((elem) => elem) // filtering undefined ones out
                    .map((elem) => Object.keys(elem.flightClub)) // taking all sizes
                    .flat(Infinity)
                    ), 
                ].sort((a, b) => a - b),*/
				filters: [],
				currentPage: 0,
				cart: state.cart || [],
				isAuthenticaded: state.isAuthenticaded || true,
				user: state.user || {},
				allUsers: state.allUsers || [],
			
				
			}; // flattening out the array

		case 'GET_DETAILS':
			return {
				...state,
				shoeDetails: action.payload,
			};

		case 'OPEN_MODAL':
			return {
				...state,
				modal: action.payload,
			};

		case 'GET_PRICES':
			return {
				...state,
				prices: action.payload,
			};

		case 'GET_REVIEWS':
			return {
				...state,
				reviews: action.payload,
			};

		case 'GET_REVIEWS_FROM_USER':
			return {
				...state,
				reviewsFromUser: action.payload,
			};

		case 'GET_AVAILABLE_SIZES':
			return {
				...state,
				sizes: action.payload,
			};

		case 'CLOSE_MODAL':
			return {
				...state,
				modal: '',
			};
		case 'SET_FILTER_BRANDS': {
			if (action.payload) {
				return {
					...state,
					filters: Array.from(new Set([...state.filters, 'brands'])),
					filterBrands: action.payload,
					currentPage: 0,
				};
			} else {
				return {
					...state,
					filters: state.filters.filter(elem => elem !== 'brands'),
					filterBrands: [],
					currentPage: 0,
				};
			}
			break;
		}
		case 'FILTER_SIZE': {
			var auxBrands = state.filteredShoes;
			if (action.payload > 0) {
				return {
					...state,
					filters: Array.from(new Set([...state.filters, 'sizes'])),
					filterSizes: action.payload,
					currentPage: 0,
				};
			} else {
				return {
					...state,
					filters: state.filters.filter(elem => elem !== 'sizes'),
					filterSizes: [],
					currentPage: 0,
				};
			}
		}
		case 'FILTER_PRICE':
			if (action.payload) {
				return {
					...state,
					filters: Array.from(new Set([...state.filters, 'price'])),
					filterPrice: action.payload,
					currentPage: 0,
				};
			} else {
				return {
					...state,
					filters: state.filters.filter(elem => elem !== 'price'),
					filterPrice: [],
					currentPage: 0,
				};
			}

		case 'UPDATE': {
			if(state.cart){
				return {
					...state,
					cart: [...state.cart]
				};
			}
		}

		case 'SHOPING_SHOES':{
			return {
				...state,
				shipingShoes:action.payload,
			}
		}

		case 'PAYMENT_MESSAGE':
			return {
				...state,
				paymentMessage:action.payload
			}

		case 'SET_PAGE': {
			return {
				...state,
				currentPage: action.payload,
			};
		}
		case 'POST_NEW_SHOE': {
			return {
				...state,
			};
		}
		case 'GET_BRANDS': {
			return {
				...state,
				getBrands: action.payload,
			};
		}
		case 'DELETE_SHOE': {
			return {
				...state,
			};
		}
		default:
			return state;
	}
}

export default rootReducer;
