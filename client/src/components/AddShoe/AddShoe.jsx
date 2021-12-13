import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBrands, postNewShoe, postReview } from '../../redux/actions/index.js';
import { Link } from 'react-router-dom';
import styles from './AddShoe.module.css';
import ColorSelect from './ColorSelect';
import axios from 'axios';

export default function AddShoe() {
	const dispatch = useDispatch();
	const brands = useSelector(state => state.getBrands);
	const sizes = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11.5, 12.5, 13, 14, 15, 16, 17, 18];
	let [searchColor, setSearchColor] = useState('');
	let [colors, setColors] = useState([]);
	let errors = {};
	let [checkState, setCheckState] = useState({
		availableSizes: new Array(sizes.length).fill(false),
	});

	// let [url, setUrl] = useState('');

	let [input, setInput] = useState({
		id: 0,
		description: '',
		silhoutte: '',
		colorway: [],
		shoeName: '',
		retailPrice: 0,
		thumbnail: '',
		brand: '',
		availableSizes: [],
	});
	let [error, setError] = useState({
		name: 'Name required',
		description: 'Description required',
		retailPrice: 'Retail price required',
		thumbnail: 'Thumbnail required',
		silhoutte: 'Silhouette required',
		colorway: 'Colorway required',
		brand: 'Brand required',
		availableSizes: 'Sizes required',
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
			errors.silhoutte = '';
		} else {
			errors.silhoutte = 'Silhouette required';
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

	// function onSelectChange(e) {
	// 	setInput({ ...input, brand: e.target.value });
	// }

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

	//flor adding stuff start section

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
		console.log(previewSource);
		if (!previewSource) return;
		await uploadImage(previewSource);
	};
	// await uploadImage(ps) ---> urlImage
	const uploadImage = async base64EncodedImage => {
		console.log(base64EncodedImage);

		try {
			const urlImage = (await axios.post('/shoes/uploadShoeImage', { data: base64EncodedImage })).data;
			setPreviewSource(urlImage);
			//console.log(urlImage);
			setInput({ ...input, thumbnail: urlImage });
			setError(validate({ ...input, thumbnail: urlImage }));
			return urlImage;
		} catch (error) {
			console.log(error);
		}
	};

	////flor adding stuff end section
	function uploadClick(e) {
		if (!previewSource) {
			alert('Please select a file first');
		}
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
		console.log(checkArr);
		if (checkArr.length > 0) {
			alert('Please fill in the required fields');
		} else {
			let newShoe = {
				name: input.name,
				description: input.description,
				silhoutte: input.silhoutte,
				colorway: input.colorway.join('/'),
				shoeName: input.shoeName,
				retailPrice: input.retailPrice,
				thumbnail: input.thumbnail,
				// thumbnail: url,
				urlKey: input.shoeName.split(' ').join('-'),
				avaiableSizes: input.availableSizes,
				brand: input.brand,
			};
			dispatch(postNewShoe(newShoe));
			alert('New entry created');
		}
	}

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
								<div className={`${styles.sizes}`}>
									{elem}
									<input
										key={elem + index}
										className={`${styles.checkboxes}`}
										name='availableSizes'
										type='checkbox'
										value={elem}
										onChange={() => handleSizes(index)}
										checked={checkState.availableSizes[index]}
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
					<img className={`${styles.thumbnail}`} src={previewSource || input.thumbnail} alt='No Thumbnail' />
				</div>
				{/* {
					previewSource && (
						<img src={previewSource} alt='No upload'
							style={{height: 300}}
						/>
					)
				} */}
				{/*
					flor adding stuff section start

					 */}
				<form onSubmit={handleSubmitFile}>
					<div className={`${styles.fileBox}`}>
						<div className={`${styles.fileInputBox}`}>
							<label className={styles.fileInput} for='files'>
								Browse...
							</label>
							<input id='files' type='file' name='image' placeholder='Upload an image' value={fileInput} onChange={handleFileInput} className={styles.hideFile}></input>
						</div>
						<button className={styles.upload_btn} type='submit' onClick={uploadClick}>
							Upload
						</button>
					</div>
				</form>

				{/*
					flor adding stuff section end

					 */}
				<div className={`${styles.divvy}`}>
					<label>Thumbnail</label>
					<input type='text' name='thumbnail' value={input.thumbnail} onChange={handleInput} className={`${error.thumbnail ? styles.error : styles.inputname}`} />
					<div>
						<button type='submit' className={`${styles.btn_create}`} onClick={onSubmit}>
							Create
						</button>
					</div>
				</div>
			</div>

			<div className={`${styles.form}`}>
				<div className={`${styles.divvy}`}>
					<label>Select brand</label>
					<select name='brand' onChange={handleInput} className={`${error.brand ? styles.error : styles.inputname}`}>
						<option value=''></option>
						{brands?.map((elem, index) => (
							<option key={elem && elem.name + index + 2} value={elem && elem.name}>
								{elem && elem.name[0].toUpperCase() + elem.name.slice(1)}
							</option>
						))}
					</select>
					<div className={`${styles.divvy}`}>
						or add a new one
						<input
							type='text'
							name='brand'
							defaultValue={input.brand ? input.brand[0].toUpperCase() + input.brand.slice(1) : ''}
							onChange={handleInput}
							className={`${error.brand ? styles.error : styles.inputname}`}
						/>
					</div>
				</div>
				<div className={`${styles.divvy}`}>
					<label>Silhouette</label>
					<input type='text' name='silhoutte' value={input.silhoutte} onChange={handleInput} className={`${error.silhoutte ? styles.error : styles.inputname}`} />
				</div>
				<div className={`${styles.divvy}`}>
					<label>Colorway</label>
					<div className={`${input.colorway.length > 0 ? styles.colorDivvy : styles.hide}`}>
						{input.colorway.length > 0
							? input.colorway.map(elem => (
									<button key={elem} value={elem} className={`${styles.btn_clearColor}`} onClick={deleteColor}>
										{elem + '  x'}
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
					<input id='retail' type='number' name='retailPrice' value={input.retailPrice} onChange={handleInput} className={`${error.retailPrice ? styles.error : styles.inputname}`} />
				</div>
			</div>
		</div>
	);
}
