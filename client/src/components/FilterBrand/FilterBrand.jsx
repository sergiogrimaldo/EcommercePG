import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getBrands } from '../../redux/actions/index.js';

export default function FilterBrand({ onFilter }) {
	const dispatch = useDispatch();
	const data = useSelector(state => state.brands);
	let [value, setValue] = useState('');

	let brandSet = new Set(data);
	var brands = [...brandSet];

	useEffect(() => {
		dispatch(getBrands());
	});

	function onChangeHandler(e) {
		setValue(e.target.value);
		onFilter(e.target.value);
	}

	return (
		<div>
			<select onChange={onChangeHandler}>
				<option value=''>---Filter By Brand---</option>
				{brands ? (
					brands.map((elem, index) => (
						<option key={elem + index} value={elem}>
							{elem[0].toUpperCase() + elem.slice(1)}
						</option>
					))
				) : (
					<option></option>
				)}
			</select>
		</div>
	);
}
