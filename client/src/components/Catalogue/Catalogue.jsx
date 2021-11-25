import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards.jsx';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import SignUp from '../Modals/SignUp';
import Login from '../Modals/Login';
import { filterBrand, getShoes, getBrands } from '../../redux/actions/index.js';

function Catalogue() {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.modal);
	const data = useSelector(state => state.shoes);
	const [brand, setBrand] = useState('');

	// const getData = () => {
	// 	fetch('allShoes.json', {
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			Accept: 'application/json',
	// 		},
	// 	})
	// 		.then(function (response) {
	// 			return response.json();
	// 		})
	// 		.then(function (myJson) {
	// 			console.log(myJson);
	// 			setData(myJson);
	// 		});
	// };
	useEffect(() => {
		// getData();
		if (!brand) {
			dispatch(getShoes());
		}
		if (brand) {
			dispatch(filterBrand(brand));
		}
	}, [dispatch, brand]);

	function onFilter(value) {
		setBrand(value);
	}

	return (
		<BrowserRouter>
			{modal === 'login' && <Login />}
			{modal === 'signUp' && <SignUp />}
			<div className='App'>
				<Header data={data} onFilter={onFilter} />
				<Cards data={data} />
			</div>
		</BrowserRouter>
	);
}

export default Catalogue;
