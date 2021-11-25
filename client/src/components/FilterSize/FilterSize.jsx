import { useState } from 'react';

export default function FilterSize({ data, onSize }) {
	let [value, setValue] = useState(0); // set value in case we want to make this filter dynamic later
	if (data) {
		let sizeFilter = data
			.map(elem => elem.resellPrices) // mapping data's resellPrices properties
			.filter(elem => elem) // filtering undefined ones out
			.map(elem => Object.keys(elem.flightClub)) // taking all sizes
			.flat(Infinity); // flattening out the array
		var sizes = [...new Set(Object.values(sizeFilter))].sort((a, b) => {
			return a - b; // storing the array as a set in another array and sorting it
		});
	}

	function onChangeHandler(e) {
		setValue(e.target.value);
		onSize(e.target.value);
	}

	return (
		<div>
			<select onChange={onChangeHandler}>
				<option value={0}>---Filter By Size---</option>
				{sizes ? (
					sizes.map((elem, index) => (
						<option key={elem + index} value={elem}>
							{elem}
						</option>
					))
				) : (
					<option> </option>
				)}
			</select>
		</div>
	);
}
