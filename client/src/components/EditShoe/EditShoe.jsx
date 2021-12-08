import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, postNewShoe, getShoeDetails } from '../../redux/actions/index.js';
import { Link } from 'react-router-dom';
import styles from './EditShoe.module.css';
import ColorSelect from '../AddShoe/ColorSelect';

export default function EditShoe({ id }) {
	const dispatch = useDispatch();
	const brands = useSelector(state => state.getBrands);
	const details = useSelector(state => state.shoeDetails);
	const sizes = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 14, 15, 16, 17, 18];
	let [searchColor, setSearchColor] = useState('');
	let errors = {};
	let colors = details.colorway.split('/').join(' ').split('-').join(' ').split(' ');
	let detailSizes = Object.keys(details.availableSize);
	let detailValues = Object.values(details.availableSize);
	let numSizes = [];
	for (let i = 0; i < detailSizes.length; i++) {
		if (detailSizes[i] !== 'id') {
			if (detailSizes[i].includes(',')) {
				numSizes.push(new Array(Number(detailSizes[i].replace(',', '.')), detailValues[i]));
			} else {
				numSizes.push(new Array(Number(detailSizes[i]), detailValues[i]));
			}
		}
	}
	numSizes = numSizes.sort((a, b) => a[0] - b[0]);
	let fixedSizes = [];
	for (let k = 0; k < numSizes.length; k++) {
		fixedSizes[k] = new Array(numSizes[k][0].toString(), numSizes[k][1]);
	}
	let nums = [];
	let vals = [];
	for (let j = 0; j < fixedSizes.length; j++) {
		if (fixedSizes[j][1] > 0) {
			nums.push(true);
			vals.push(Number(fixedSizes[j][0]));
		} else {
			nums.push(false);
			vals.push(0);
		}
	}

	let [checkState, setCheckState] = useState({
		availableSizes: nums,
	});

	let [input, setInput] = useState({
		description: details.description,
		silhoutte: details.silhoutte,
		colorway: colors,
		shoeName: details.shoeName,
		retailPrice: details.price.retailPrice,
		thumbnail: details.thumbnail,
		brand: details.brand.name,
		availableSizes: vals,
	});

	let [error, setError] = useState({
		name: 'Name required',
		description: 'Description required',
		retailPrice: 'Retail price required',
		thumbnail: 'Thumbnail required',
		silhouette: 'Silhouette required',
		colorway: 'Colorway required',
		brand: 'Brand required',
		availableSizes: 'Sizes required',
	});

	useEffect(() => {
		dispatch(getShoeDetails(id));
		dispatch(getBrands());
		setError(validate({ ...input }));
	}, [id]);

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
		if (input.retailPrice > 0) {
			errors.retailPrice = '';
		} else {
			errors.retailPrice = 'Retail price required';
		}
		if (input.thumbnail) {
			errors.thumbnail = '';
		} else {
			errors.thumbnail = 'Thumbnail required';
		}
		if (input.colorway.length > 0) {
			errors.colorway = '';
		} else {
			errors.colorway = 'Colorway required';
		}
		if (input.silhoutte) {
			errors.silhouette = '';
		} else {
			errors.silhouette = 'Silhouette required';
		}
		if (input.brand) {
			errors.brand = '';
		} else {
			errors.brand = 'Brand required';
		}
		if (input.availableSizes.length > 0) {
			errors.availableSizes = '';
		} else {
			errors.availableSizes = 'Sizes required';
		}

		return errors;
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
		setError(validate({ ...input, availableSizes: sizeArr.filter(elem => elem !== 0) }));
	}

	function handleInput(e) {
		setInput({ ...input, [e.target.name]: e.target.value });
		setError(validate({ ...input, [e.target.name]: e.target.value }));
	}

	function handleColors(color) {
		// setColors([...colors, e]);
		setInput({ ...input, colorway: [...input.colorway, color] });
		setError(validate({ ...input, colorway: [...input.colorway, color] }));
		setSearchColor('');
	}

	function deleteColor(e) {
		setInput({ ...input, colorway: [...input.colorway].filter(elem => elem !== e.target.value) });
		setError(validate({ ...input, colorway: [...input.colorway].filter(elem => elem !== e.target.value) }));
	}

	function onSubmit(e) {
		e.preventDefault();
		let checkObj = Object.values(error);
		let checkArr = checkObj.filter(elem => elem !== '');
		if (checkArr.length > 0) {
			alert('Please fill in the required fields');
		} else {
			let newShoe = {
				name: input.name,
				description: input.description,
				silhoutte: input.silhouette,
				colorway: input.colorway.join('/'),
				shoeName: input.shoeName,
				retailPrice: input.retailPrice,
				thumbnail: input.thumbnail,
				urlKey: input.shoeName.split(' ').join('-'),
				avaiableSizes: input.availableSizes,
				brand: input.brand,
			};
			dispatch(postNewShoe(newShoe));
			alert('New entry created');
		}
	}

	console.log(vals);

	return (
		<div className={`${styles.main}`}>
			<form className={`${styles.form}`} onSubmit={onSubmit}>
				<div className={`${styles.divvy}`}>
					<label>Name</label>
					<input type='text' name='shoeName' value={input.shoeName} onChange={handleInput} className={`${error.name ? styles.error : styles.inputname}`} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Description</label>
					<textarea className={`${error.description ? styles.error_desc : styles.desc}`} type='text' name='description' value={input.description} onChange={handleInput} />
				</div>

				<div className={`${styles.divvy}`}>
					<label>
						Available Sizes<label className={`${error.availableSizes ? styles.req : styles.hide}`}>Size Required</label>
					</label>
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
				<Link to='/catalogue'>
					<button className={`${styles.btn_back}`}>Back to Catalogue</button>
				</Link>
				<button type='submit' className={`${styles.btn_create}`}>
					Create
				</button>
			</form>
			<div>
				<div className={`${styles.thumbnail_box}`}>
					<img className={`${styles.thumbnail}`} src={input.thumbnail} alt='No Thumbnail' />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Thumbnail</label>
					<input type='text' name='thumbnail' value={input.thumbnail} onChange={handleInput} className={`${error.thumbnail ? styles.error : styles.inputname}`} />
				</div>
			</div>

			<div className={`${styles.form}`}>
				<div className={`${styles.divvy}`}>
					<label>Select brand</label>
					<select name='brand' onChange={handleInput} className={`${error.brand ? styles.error : styles.inputname}`}>
						<option value=''></option>
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
							<input type='text' name='brand' value={input.brand} onChange={handleInput} className={`${error.brand ? styles.error : styles.inputname}`} />
						</div>
					</div>
				</div>
				<div className={`${styles.divvy}`}>
					<label>Silhouette</label>
					<input type='text' name='silhouette' value={input.silhoutte} onChange={handleInput} className={`${error.silhouette ? styles.error : styles.inputname}`} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Colorway</label>
					<div className={`${input.colorway.length > 0 ? styles.colorDivvy : styles.hide}`}>
						{input.colorway.length > 0
							? input.colorway.map(elem => (
									<button key={elem} value={elem} className={`${styles.btn_clearColor}`} onClick={deleteColor}>
										{elem} <label className={`${styles.xLabel}`}>x</label>
									</button>
							  ))
							: ''}
					</div>
					<input type='text' value={searchColor} onChange={e => setSearchColor(e.target.value)} className={`${error.colorway ? styles.error : styles.inputname}`} />

					<div className={`${searchColor ? styles.colorbox : styles.hide}`}>
						<ColorSelect input={searchColor} handleColors={handleColors} />
					</div>
				</div>
				<div className={`${styles.divvy}`}>
					<label>Retail Price</label>
					<input type='number' name='retailPrice' value={input.retailPrice} onChange={handleInput} className={`${error.retailPrice ? styles.error : styles.inputname}`} />
				</div>
			</div>
		</div>
	);
}
