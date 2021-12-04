import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, postNewShoe } from '../../redux/actions/index.js';
import styles from './AddShoe.module.css';

export default function AddShoe() {
	const dispatch = useDispatch();
	const brands = useSelector(state => state.getBrands);
	const sizes = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5, 12.5, 13, 14, 15, 16, 17, 18];
	let errors = {};
	let [checkState, setCheckState] = useState({
		availableSizes: new Array(sizes.length).fill(false),
	});

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
		availableSizes: [],
		brand: '',
	});
	let [error, setError] = useState({
		name: 'Name required',
		description: 'Description required',
		stock: 'Stock required',
		retailPrice: 'Retail price required',
	});

	useEffect(() => {
		dispatch(getBrands());
	}, []);

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

	function onSelectChange(e) {
		setInput({ ...input, brand: e.target.value });
	}

	function handleSizes(pos) {
		let sizeCheckState = checkState.availableSizes.map((elem, index) => {
			if (index === pos) {
				return !elem;
			}
			return elem;
		});
		setCheckState({ availableSizes: sizeCheckState });
		var sizeArr = sizeCheckState
			.map((elem, index) => {
				if (elem === true) {
					return sizes[index];
				}
				return 0;
			})
			.filter(elem => typeof elem === 'number');
		setInput({ ...input, availableSizes: sizeArr });
		// setError(validate({ ...input, availableSizes: sizeArr }));
	}

	function handleInput(e) {
		setInput({ ...input, [e.target.name]: e.target.value });
		setError(validate({ ...input, [e.target.name]: e.target.value }));
	}

	console.log(input);

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
				avaiableSizes: input.availableSizes,
				brand: input.brand,
			};
			dispatch(postNewShoe(newShoe));
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
					<label>Select brand</label>
					<select name='brand' onChange={onSelectChange}>
						<option value=''>---Select Brand---</option>
						{brands &&
							brands.map((elem, index) => (
								<option key={elem + index + 2} value={elem.name}>
									{elem.name[0].toUpperCase() + elem.name.slice(1)}
								</option>
							))}
					</select>
					<div className={`${styles.divvy}`}>
						or add a new one
						<div className={`${styles.divvy}`}>
							<input type='text' name='brand' value={input.brand} onChange={handleInput} />
						</div>
					</div>
				</div>
				<div className={`${styles.divvy}`}>
					<label>Available Sizes</label>
					<div className={`${styles.sizebox}`}>
						{sizes &&
							sizes.map((elem, index) => (
								<div className={`${styles.sizes}`} key={elem + index}>
									{elem}
									<input className={`${styles.checkboxes}`} name='availableSizes' type='checkbox' value={elem} onChange={() => handleSizes(index)} checked={checkState.availableSizes[index]} />
								</div>
							))}
					</div>
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
