import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards.jsx';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import SignUp from '../Modals/SignUp';
import Login from '../Modals/Login';
import {
	filterBrand,
	getShoes,
	getBrands,
	filterSize,
} from '../../redux/actions/index.js';

function Catalogue() {
	const dispatch = useDispatch();
	const modal = useSelector(state => state.modal);
	const data = useSelector(state => state.shoes);
	const [brand, setBrand] = useState('');
	const [size, setSize] = useState(0);

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
		if (!brand && !size) {
			dispatch(getShoes());
		}
		if (brand) {
			dispatch(filterBrand(brand));
		}
		if (size > 0) {
			dispatch(filterSize(size));
		}
	}, [dispatch, brand, size]);

	function onFilter(value) {
		setBrand(value);
	}

	function onSize(value) {
		setSize(value);
	}

	console.log(size);

	return (
		<BrowserRouter>
			{modal === 'login' && <Login />}
			{modal === 'signUp' && <SignUp />}
			<div className='App'>
				<Header data={data} onFilter={onFilter} onSize={onSize} />
				<Cards data={data} />
			</div>
		</BrowserRouter>
	);
}

export default Catalogue;
