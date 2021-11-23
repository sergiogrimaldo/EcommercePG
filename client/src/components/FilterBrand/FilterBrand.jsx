import { useSelector } from 'react-redux';
import { useState } from 'react';

export default function FilterBrand({ data }) {
	let brandSet = new Set(data.map(elem => elem.brand));
	let brands = [...brandSet];
	let [value, setValue] = useState('');

	function onChangeHandler(e) {
		setValue(e.target.value);
		console.log(e.target.value);
	}

	return (
		<div>
			<select onChange={onChangeHandler}>
				<option value=''>---Filter By Brand---</option>
				{brands.map((elem, index) => (
					<option key={elem + index} value={elem}>
						{elem[0].toUpperCase() + elem.slice(1)}
					</option>
				))}
			</select>
		</div>
	);
}
