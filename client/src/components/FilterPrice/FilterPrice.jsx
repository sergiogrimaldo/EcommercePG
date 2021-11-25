import { useState, useEffect } from 'react';
import styles from './FilterPrice.module.css';

export default function FilterPrice({ data }) {
	if (data) {
		let maxPriceArr = data
			.map(elem => elem.lowestResellPrice)
			.filter(elem => elem)
			.map(elem => Object.values(elem))
			.flat();

		let maxPrice = Math.max(...maxPriceArr);

		var roundUpMax = (Math.trunc(maxPrice / 100) + 1) * 100;
	}

	let [value, setValue] = useState(0);

	useEffect(() => {
		if (!value || value === -Infinity) {
			setValue(roundUpMax);
		}
	});

	function onChangeHandler(e) {
		setValue(e.target.value);
		console.log(e.target.value);
	}

	return (
		<div>
			<label>Price</label>
			<input
				type='range'
				min='0'
				max={roundUpMax}
				step='100'
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
