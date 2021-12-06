import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import setAuthorizationToken from './utils/setAutToken';
import jwt from 'jsonwebtoken';
import { setCurrentUser } from './redux/actions';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';


// if (localStorage.jwtToken) {
//   setAuthorizationToken(localStorage.jwtToken);
//   store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
// }

// setAuthorizationToken(localStorage.jwtToken);
// store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));

// store.subscribe(()=>{
//   localStorage.setItem('reduxState', JSON.stringify(store.getState()))
// })

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
