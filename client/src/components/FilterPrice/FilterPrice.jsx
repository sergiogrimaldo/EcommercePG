import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterPrice } from '../../redux/actions/index.js';
import styles from './FilterPrice.module.css';

export default function FilterPrice() {
	const dispatch = useDispatch();
	let [value, setValue] = useState(0);
	let data = useSelector(state => state.prices);

	let maxPrice = Math.max(...data);
	var roundUpMax = (Math.trunc(maxPrice / 100) + 1) * 100;

	useEffect(() => {
		if (!value || value === -Infinity) {
			setValue(roundUpMax);
		}
	});

	function onChangeHandler(e) {
		setValue(e.target.value);
		dispatch(filterPrice(e.target.value));
	}

	return (
		<div>
			<input
				type='range'
				min='0'
				max={roundUpMax}
				step='50'
				value={value}
				onChange={onChangeHandler}
			/>
			<label
				className={`${value !== -Infinity ? styles.label : styles.labelHide}`}>
				{`$${value}`}
			</label>
		</div>
	);
}
