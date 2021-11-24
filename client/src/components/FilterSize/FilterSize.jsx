import { useState } from 'react';

export default function FilterSize({ data }) {
	let [value, setValue] = useState(0);
	let sizeFilter = data
		.map(elem => elem.resellPrices)
		.filter(elem => elem)
		.map(elem => Object.keys(elem.flightClub))
		.flat(Infinity);
	let sizes = [...new Set(Object.values(sizeFilter))].sort((a, b) => {
		return a - b;
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
