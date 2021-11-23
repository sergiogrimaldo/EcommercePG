import { useState } from 'react';

export default function FilterSize() {
	const sizes = [4, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5];
	let [value, setValue] = useState(0);

	function onChangeHandler(e) {
		setValue(e.target.value);
		console.log(e.target.value);
	}

	return (
		<div>
			<div>Filter By Size</div>
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
