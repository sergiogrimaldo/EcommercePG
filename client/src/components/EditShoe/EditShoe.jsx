import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, postNewShoe, getShoeDetails, putNewShoe } from '../../redux/actions/index.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './EditShoe.module.css';
import ColorSelect from '../AddShoe/ColorSelect';

export default function EditShoe({ id }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getShoeDetails(id));
		dispatch(getBrands());
	}, []);
	const details = useSelector(state => state.shoeDetails);
	const brands = useSelector(state => state.getBrands);
	const sizes = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5, 12.5, 13, 14, 15, 16, 17, 18];
	let [searchColor, setSearchColor] = useState('');
	let errors = {};
	let [count, setCount] = useState(0);
	if (details && details.id === parseInt(id)) {
		let detailSizes = Object.keys(details.availableSize); // {"4": 0, "5":2, "id": 13, "3,5":1, "4,5": 0}
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
		var fixedSizes = [];
		for (let k = 0; k < numSizes.length; k++) {
			fixedSizes[k] = new Array(numSizes[k][0].toString(), numSizes[k][1]);
		}
		var nums = [];
		var origVals = [];
		var vals = [];
		for (let j = 0; j < fixedSizes.length; j++) {
			if (fixedSizes[j][1] > 0) {
				nums.push(true);
				vals.push(Number(fixedSizes[j][0]));
				origVals.push(Number(fixedSizes[j][1]));
			} else {
				nums.push(false);
				vals.push(0);
				origVals.push(0);
			}
		}
	}

	let [checkState, setCheckState] = useState({
		availableSizes: new Array(sizes.length).fill(false),
	});

	//flor
	let [url, setUrl] = useState('');
	//flor

	let [input, setInput] = useState({
		description: '',
		silhoutte: '',
		colorway: '',
		shoeName: '',
		retailPrice: 0,
		thumbnail: '',
		brand: '',
		availableSizes: [],
	});

	let [error, setError] = useState({
		name: '',
		description: '',
		retailPrice: '',
		thumbnail: '',
		silhoutte: '',
		colorway: '',
		brand: '',
		availableSizes: '',
	});

	function validate(input) {
		if (input.shoeName || document.getElementById('sn').value) {
			errors.name = '';
		} else {
			errors.name = 'Name required';
		}
		if (input.description || document.getElementById('ds').value) {
			errors.description = '';
		} else {
			errors.description = 'Description required';
		}
		if (input.retailPrice > 0 || document.getElementById('retail').value > 0) {
			errors.retailPrice = '';
		} else {
			errors.retailPrice = 'Retail price required';
		}
		if (input.thumbnail || document.getElementById('tn').value) {
			errors.thumbnail = '';
		} else {
			errors.thumbnail = 'Thumbnail required';
		}
		if (input.colorway.length > 0 || input.colorway === '') {
			errors.colorway = '';
		} else {
			errors.colorway = 'Colorway required';
		}
		if (input.silhoutte || document.getElementById('sil').value) {
			errors.silhoutte = '';
		} else {
			errors.silhoutte = 'Silhouette required';
		}
		if (input.brand || document.getElementById('br_sl').value || document.getElementById('br_in').value) {
			errors.brand = '';
		} else {
			errors.brand = 'Brand required';
		}
		if (!input.availableSizes.filter(elem => elem !== 0).length || input.availableSizes.length > 0 || count === 0) {
			errors.availableSizes = '';
		} else {
			errors.availableSizes = 'Sizes required';
		}

		return errors;
	}

	function handleSizes(pos) {
		let sizeCheckState;
		if (count === 0) {
			sizeCheckState =
				nums &&
				nums.map((elem, index) => {
					if (index === pos) {
						return !elem;
					}
					return elem;
				});
		} else {
			sizeCheckState =
				checkState &&
				checkState.availableSizes.map((elem, index) => {
					if (index === pos) {
						return !elem;
					}
					return elem;
				});
		}

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
		setCount(count + 1);
	}

	function handleInput(e) {
		setInput({ ...input, [e.target.name]: e.target.value });
		setError(validate({ ...input, [e.target.name]: e.target.value }));
	}

	//flor adding cloudinary stuff start section

	const [fileInput, setFileInput] = useState('');

	const [previewSource, setPreviewSource] = useState('');

	const handleFileInput = e => {
		const file = e.target.files[0];
		previewFile(file);
	};

	const previewFile = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
		};
	};
	const handleSubmitFile = async e => {
		e.preventDefault();
		//console.log(previewSource);
		if (!previewSource) return;
		await uploadImage(previewSource);
	};
	// await uploadImage(ps) ---> urlImage
	const uploadImage = async base64EncodedImage => {
		//console.log(base64EncodedImage);

		try {
			const urlImage = (await axios.post('/shoes/uploadShoeImage', { data: base64EncodedImage })).data;
			setPreviewSource(urlImage);
			//console.log(urlImage);
			setUrl(urlImage);
			setInput({
				...input,
				thumbnail: urlImage,
			});
			setError(
				validate({
					...input,
					thumbnail: urlImage,
				})
			);
			return urlImage;
		} catch (error) {
			console.log(error);
		}
	};

	////flor adding clodinary stuff end section

	function handleColors(color) {
		// setColors([...colors, e]);
		if (!input.colorway) {
			setInput({ ...input, colorway: details.colorway && [...details.colorway.split('/').join(' ').split('-').join(' ').split(' '), color] });
			setError(validate({ ...input, colorway: [...input.colorway, details.colorway.split('/').join(' ').split('-').join(' ').split(' '), color] }));
		} else {
			setInput({ ...input, colorway: [...input.colorway, color] });
			setError(validate({ ...input, colorway: [...input.colorway, color] }));
		}
		setSearchColor('');
		document.getElementById('scolor').value = '';
	}

	function deleteColor(e) {
		setInput({ ...input, colorway: input.colorway && [...input.colorway].filter(elem => elem !== e.target.value) });
		setError(validate({ ...input, colorway: input.colorway && [...input.colorway].filter(elem => elem !== e.target.value) }));
	}

	function createColorArr(e) {
		setInput({
			...input,
			colorway: details.colorway && [...details.colorway.split('/').join(' ').split('-').join(' ').split(' ')].filter(elem => elem !== e.target.value),
		});
		setError(validate({ ...input, colorway: [...input.colorway, details.colorway.split('/').join(' ').split('-').join(' ').split(' ')].filter(elem => elem !== e.target.value) }));
	}

	function onSubmit(e) {
		e.preventDefault();
		let checkObj = Object.values(error);
		let checkArr = checkObj.filter(elem => elem !== '');
		if (checkArr.length > 0) {
			alert('Please fill in the required fields');
		} else {
			let newShoe = {
				description: input.description || details.description,
				silhoutte: input.silhoutte || details.silhoutte,
				colorway: Array.isArray(input.colorway) ? input.colorway.join('/') : details.colorway.split('/').join(' ').split('-').join(' ').split(' ').join('/'),
				shoeName: input.shoeName || details.shoeName,
				retailPrice: input.retailPrice || details.price.retailPrice,
				thumbnail: input.thumbnail || details.thumbnail,
				urlKey: input.shoeName.split(' ').join('-') || details.shoeName.split(' ').join('-'),
				avaiableSizes: input.availableSizes.length > 0 ? input.availableSizes : vals,
				brand: input.brand || details.brand.name,
				origSizeVals: origVals,
			};
			//console.log(newShoe);
			dispatch(putNewShoe(id, newShoe));
			alert('Entry updated');
		}
	}

	return (
		<div className={`${styles.main}`}>
			<form className={`${styles.form}`} onSubmit={onSubmit}>
				<div className={`${styles.divvy}`}>
					<label>Name</label>
					<input id='sn' type='text' name='shoeName' defaultValue={details.shoeName} onInput={handleInput} className={`${error.name ? styles.error : styles.inputname}`} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Description</label>
					<textarea id='ds' className={`${error.description ? styles.error_desc : styles.desc}`} type='text' name='description' defaultValue={details.description} onInput={handleInput} />
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
									<input
										className={`${styles.checkboxes}`}
										name='availableSizes'
										type='checkbox'
										value={elem}
										onChange={() => handleSizes(index)}
										checked={checkState.availableSizes.includes(true) ? checkState.availableSizes[index] : nums && nums[index]}
									/>
								</div>
							))}
					</div>
				</div>
				<Link to='/catalogue'>
					<button className={`${styles.btn_back}`}>Back to Catalogue</button>
				</Link>
			</form>
			<div>
				<div className={`${styles.thumbnail_box}`}>
					<img className={`${styles.thumbnail}`} src={input.thumbnail ? input.thumbnail : details.thumbnail} alt='No Thumbnail' />
				</div>
				{/*
					flor adding stuff section start

					 */}
				<form onSubmit={handleSubmitFile}>
					<div className={`${styles.fileBox}`}>
						<div className={`${styles.fileInputBox}`}>
							<label className={styles.fileInput} for='files_edit'>
								Browse...
							</label>
							<input id='files_edit' type='file' name='image' placeholder='Upload an image' value={fileInput} onChange={handleFileInput} className={styles.hideFile}></input>
						</div>
						<button type='submit' className={styles.upload_btn}>
							Upload
						</button>
					</div>
				</form>

				{/*
					flor adding stuff section end

					 */}
				<div className={`${styles.divvy}`}>
					<label className="label">Thumbnail</label>
					<input
						id='tn'
						type='text'
						name='thumbnail'
						defaultValue={input.thumbnail ? input.thumbnail : details.thumbnail}
						onInput={handleInput}
						className={`${error.thumbnail ? styles.error : styles.inputname}`}
					/>
					<div>
						<button type='submit' className={`${styles.btn_create}`} onClick={onSubmit}>
							Update
						</button>
					</div>
				</div>
			</div>

			<div className={`${styles.form}`}>
				<div className={`${styles.divvy}`}>
					<label>Select brand</label>
					<select
						id='br_sl'
						defaultValue={input.brand ? input.brand : details.brand && details.brand.name}
						name='brand'
						onChange={handleInput}
						className={`${error.brand ? styles.error : styles.inputname}`}>
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
							<input
								id='br_in'
								type='text'
								name='brand'
								defaultValue={input.brand ? input.brand[0].toUpperCase() + input.brand.slice(1) : details.brand && details.brand.name[0].toUpperCase() + details.brand.name.slice(1)}
								onInput={handleInput}
								className={`${error.brand ? styles.error : styles.inputname}`}
							/>
						</div>
					</div>
				</div>
				<div className={`${styles.divvy}`}>
					<label>Silhouette</label>
					<input id='sil' type='text' name='silhoutte' defaultValue={details.silhoutte} onInput={handleInput} className={`${error.silhoutte ? styles.error : styles.inputname}`} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Colorway</label>
					<div
						className={`${
							(input.colorway && input.colorway.length > 0) || (details.colorway && details.colorway.split('/').join(' ').split('-').join(' ').split(' ').join(' '))
								? styles.colorDivvy
								: styles.hide
						}`}>
						{input.colorway
							? input.colorway.map((elem, index) => (
									<button key={elem + index} value={elem} className={`${styles.btn_clearColor}`} onClick={deleteColor}>
										{elem + '  x'}
									</button>
							  ))
							: details.colorway &&
							  details.colorway
									.split('/')
									.join(' ')
									.split('-')
									.join(' ')
									.split(' ')
									.map((elem, index) => (
										<button key={elem + index} value={elem} className={`${styles.btn_clearColor}`} onClick={createColorArr}>
											{elem + '  x'}
										</button>
									))}
					</div>
					<input id='scolor' type='text' defaultValue={searchColor} onInput={e => setSearchColor(e.target.value)} className={`${error.colorway ? styles.error : styles.inputname}`} />

					<div className={`${searchColor ? styles.colorbox : styles.hide}`}>
						<ColorSelect input={searchColor} handleColors={handleColors} />
					</div>
				</div>
				<div className={`${styles.divvy}`}>
					<label>Retail Price</label>
					<input
						id='retail'
						type='number'
						name='retailPrice'
						defaultValue={details.price && details.price.retailPrice}
						onInput={handleInput}
						className={`${error.retailPrice ? styles.error : styles.inputname}`}
					/>
				</div>
			</div>
		</div>
	);
}
