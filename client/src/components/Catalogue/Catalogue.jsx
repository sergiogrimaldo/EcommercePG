/* eslint-disable no-loop-func */
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards.jsx';
import { getReviews } from "../../redux/actions/index.js";
import { getReviewsFromUser } from "../../redux/actions/index.js";
import Header from '../Header/Header';
import { useSelector, useDispatch } from 'react-redux';
import SignUp from '../Modals/SignUp';
import { compileData } from './dataSupport';
import AddShoe from '../AddShoe/AddShoe.jsx';
import Login from '../Modals/Login';
import { filterBrand, getShoes, getPrices, getAvailableSizes, getBrands, filterSize,search } from '../../redux/actions/index.js';
import styles from './Catalogue.module.css';

function Catalogue() {
	
	const dispatch = useDispatch();
	// const modal = useSelector(state => state.modal);
	const dataShoes = useSelector(state => state.shoes);
	const dataSizes = useSelector(state => state.sizes);
	const dataPrices = useSelector(state => state.prices);
    const user = useSelector((state) => state.user);
	const [brand, setBrand] = useState('');
	const [size, setSize] = useState(0);
	let data = [];

	if (dataShoes && dataSizes && dataPrices) {
		data = compileData(dataShoes, dataSizes, dataPrices);
	}
    //console.log(user);
	useEffect(() => {
		dispatch(getShoes());
		dispatch(search(''))
		dispatch(getPrices());
		dispatch(getAvailableSizes());
        dispatch(getReviews());
        if (user && user.id) {
            dispatch(getReviewsFromUser(user.id));
        }
	}, []);

    

	return (
		<div className={styles.container} style={{position:'relative'}}>
			{user && user.role == 2 && <Link to='/addshoe' style={{cursor:'pointer',position:'fixed',bottom:25,right:25}}><button style={{border:'none',padding:10,borderRadius:'50%'}}> <h1>+</h1></button></Link> }
		{/* <div className={styles.container}> */}
			<Header data={data && data} />
			<Cards data={data && data} />
		</div>
	);
}

export default Catalogue;
