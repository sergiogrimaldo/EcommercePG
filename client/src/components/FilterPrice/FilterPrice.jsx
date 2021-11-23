import { useState } from 'react';

export default function FilterPrice() {
	let prices = [0, 45, 32, 199, 344, 21, 8, 76];
	let maxPrice = Math.max(...prices);
	let roundUpMax = (Math.trunc(maxPrice / 100) + 1) * 100;

	let [value, setValue] = useState(roundUpMax);

	function onChangeHandler(e) {
		setValue(e.target.value);
		console.log(e.target.value);
	}

	return (
		<div>
			<div>Price</div>
			<input
				type='range'
				min='0'
				max={roundUpMax}
				step='50'
				value={value}
				onChange={onChangeHandler}
			/>
		</div>
	);
}
