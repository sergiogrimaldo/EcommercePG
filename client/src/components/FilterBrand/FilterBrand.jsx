import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function FilterBrand({ filterBrand }) {
	let brands = ['Nike', 'Jordan', 'Reebok', 'Adidas'];
	let [value, setValue] = useState('');

	function onChangeHandler(e) {
		setValue(e.target.value);
		console.log(e.target.value);
	}

	return (
		<div>
			<span>Filter By Brand</span>
			<select onChange={onChangeHandler}>
				<option value=''>---Filter By Brand---</option>
				{brands.map((elem, index) => (
					<option key={elem + index} value={elem}>
						{elem}
					</option>
				))}
			</select>
		</div>
	);
}
