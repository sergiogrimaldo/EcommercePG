/* eslint-disable no-loop-func */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards.jsx';
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import SignUp from '../Modals/SignUp';
import { compileData } from './dataSupport';
import Login from '../Modals/Login';
import { filterBrand, getShoes, getPrices, getAvailableSizes, getBrands, filterSize } from '../../redux/actions/index.js';
import styles from './Catalogue.module.css';

function Catalogue() {
	const dispatch = useDispatch();
	// const modal = useSelector(state => state.modal);
	const dataShoes = useSelector(state => state.shoes);
	const dataSizes = useSelector(state => state.sizes);
	const dataPrices = useSelector(state => state.prices);
	const [brand, setBrand] = useState('');
	const [size, setSize] = useState(0);
	let data = [];

	if (dataShoes && dataSizes && dataPrices) {
		data = compileData(dataShoes, dataSizes, dataPrices);
	}
	useEffect(() => {
		dispatch(getShoes());
		dispatch(getPrices());
		dispatch(getAvailableSizes());
	}, []);

	return (
		<div className={`${styles.container}`}>
			<Header data={data && data} />
			<Cards data={data && data} />
		</div>
	);
}

export default Catalogue;
