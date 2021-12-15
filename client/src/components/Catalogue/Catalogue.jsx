/* eslint-disable no-loop-func */
import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Cards from "../Cards/Cards.jsx";
import { 
    getReviews, getUsers, getReviewsFromUser, postCartInDB, 
    getShoes, getPrices, getAvailableSizes, search 
} from "../../redux/actions/index.js";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import { compileData } from "./dataSupport";
import styles from "./Catalogue.module.css";

function Catalogue() {
	
	const dispatch = useDispatch();
	const dataShoes = useSelector(state => state.shoes);
	const dataSizes = useSelector(state => state.sizes);
	const dataPrices = useSelector(state => state.prices);
    const user = useSelector((state) => state.user);
    // const cart = useSelector((state) => state.cart);
	let data = [];
    
    
    // useEffect(() => {
    //     if (user && user.id && cart) {
    //         dispatch(postCartInDB({userId: user.id, cartElements: cart}));
    //         dispatch(getUsers());
    //     }
    // }, [user, dispatch, cart]);

    if (dataShoes && dataSizes && dataPrices) {
        data = compileData(dataShoes, dataSizes, dataPrices);
    }

	useEffect(() => {
        dispatch(getUsers());
		dispatch(getShoes());
		dispatch(search(''))
		dispatch(getPrices());
		dispatch(getAvailableSizes());
        dispatch(getReviews());
        if (user && user.id) {
            dispatch(getReviewsFromUser(user.id));
        }
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

    

	return (
		<div className={styles.container} style={{position:'relative'}}>
			{user && user.role == 2 && <Link to='/addshoe' style={{cursor:'pointer',position:'fixed',bottom:25,right:25}}><button style={{border:'none',padding:10,borderRadius:'50%'}}> <h1>+</h1></button></Link> }
			<Header data={data && data} />
			<Cards data={data && data} />
		</div>
	);
}

export default Catalogue;
