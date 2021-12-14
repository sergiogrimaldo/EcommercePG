import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setFilterBrands } from '../../redux/actions/index.js';
import { setPage } from '../../redux/actions/index.js';
import styles from './FilterBrand.module.css';
import axios from 'axios';

export default function FilterBrand() {
	const dispatch = useDispatch();
	const [brands, setBrands] = useState([]);
	let [value, setValue] = useState('');

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		await axios.get('/brands').then(r => {
			setBrands(r.data);
		});
	}, []);

	function onChangeHandler(e) {
		if (e.target.value) {
			setValue(e.target.value[0].toUpperCase() + e.target.value.slice(1));
		} else {
			setValue(e.target.value);
		}
		dispatch(setFilterBrands(e.target.value));
		dispatch(setPage(0));
	}

	return (
		<div className={`${styles.drop}`}>
			<button className={`${!value && brands ? styles.menu : styles.menu_active}`}>{value && brands ? value : 'Brand'}</button>
			<div className={`${styles.select}`}>
				<button className={`${styles.btn}`} value='' onClick={onChangeHandler}>
					All Brands
				</button>
				{brands?.map((elem, index) => {
					return (
						<button className={`${styles.btn}`} key={elem && elem.name + index} value={elem && elem.name} onClick={onChangeHandler}>
							{elem && elem.name[0].toUpperCase() + elem.name.slice(1)}
						</button>
					);
				})}
			</div>
		</div>
	);
}
