import React, { useState, useEffect } from 'react';
import styles from './AddShoe.module.css';

export default function AddShoe() {
	let errors = {};
	let [input, setInput] = useState({
		id: 0,
		description: '',
		stock: 0,
		silhoutte: '',
		colorway: '',
		shoeName: '',
		retailPrice: 0,
		thumbnail: '',
		urlKey: '',
		avaiableSizeId: 0,
		brandId: 0,
		priceId: 0,
	});
	let [error, setError] = useState({
		name: 'Name required',
		description: 'Description required',
		stock: 'Stock required',
		retailPrice: 'Retail price required',
	});

	function validate(input) {
		if (input.shoeName) {
			errors.name = '';
		} else {
			errors.name = 'Name required';
		}
		if (input.description) {
			errors.description = '';
		} else {
			errors.description = 'Description required';
		}
		if (input.stock > 0) {
			errors.stock = '';
		} else {
			errors.stock = 'Stock required';
		}
		if (input.retailPrice > 0) {
			errors.retailPrice = '';
		} else {
			errors.retailPrice = 'Retail price required';
		}
		return errors;
	}

	function handleInput(e) {
		setInput({ ...input, [e.target.name]: e.target.value });
		setError(validate({ ...input, [e.target.name]: e.target.value }));
	}

	function onSubmit(e) {
		e.preventDefault();
		let checkObj = Object.values(error);
		let checkArr = checkObj.filter(elem => elem !== '');
		console.log(checkArr);
		if (checkArr.length > 0) {
			alert('Please fill in the required fields');
		} else {
			let newShoe = {
				name: input.name,
				description: input.description,
				stock: input.stock,
				silhoutte: input.silhouette,
				colorway: input.colorway,
				shoeName: input.shoeName,
				retailPrice: input.retailPrice,
				thumbnail: input.thumbnail,
				urlKey: input.urlKey,
				avaiableSizeId: input.availableSizeId,
				brandId: input.brandId,
				priceId: input.priceId,
			};
			console.log(newShoe);
		}
	}

	return (
		<div className={`${styles.main}`}>
			<form className={`${styles.form}`} onSubmit={onSubmit}>
				<div className={`${styles.divvy}`}>
					<label>Name</label>
					<input type='text' name='shoeName' value={input.shoeName} onChange={handleInput} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Description</label>
					<textarea type='text' name='description' value={input.description} onChange={handleInput} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Stock</label>
					<input type='number' name='stock' value={input.stock} onChange={handleInput} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Silhouette</label>
					<input type='text' name='silhouette' value={input.silhouette} onChange={handleInput} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Colorway</label>
					<input type='text' name='colorway' value={input.colorway} onChange={handleInput} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Retail Price</label>
					<input type='number' name='retailPrice' value={input.retailPrice} onChange={handleInput} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Thumbnail</label>
					<input type='text' name='thumbnail' value={input.thumbnail} onChange={handleInput} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>UrlKey</label>
					<input type='text' name='urlKey' value={input.urlKey} onChange={handleInput} />
				</div>
				<button type='submit' className={`${styles.btn}`}>
					Enter
				</button>
			</form>
		</div>
	);
}
