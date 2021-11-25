import { useState } from 'react';

export default function FilterSize({ data }) {
	let [value, setValue] = useState(0); // set value in case we want to make this filter dynamic later
	let sizeFilter = data
		.map(elem => elem.resellPrices) // mapping data's resellPrices properties
		.filter(elem => elem) // filtering undefined ones out
		.map(elem => Object.keys(elem.flightClub)) // taking all sizes
		.flat(Infinity); // flattening out the array
	let sizes = [...new Set(Object.values(sizeFilter))].sort((a, b) => {
		return a - b; // storing the array as a set in another array and sorting it
	});

	function onChangeHandler(e) {
		setValue(e.target.value);
		console.log(e.target.value);
	}

	return (
		<div>
			<select onChange={onChangeHandler}>
				<option>---Filter By Size---</option>
				{sizes.map((elem, index) => (
					<option key={elem + index} value={elem}>
						{elem}
					</option>
				))}
			</select>
		</div>
	);
}