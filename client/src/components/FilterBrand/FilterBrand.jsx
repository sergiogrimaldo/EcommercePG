import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { setFilterBrands } from '../../redux/actions/index.js';
import { setPage } from '../../redux/actions/index.js';

export default function FilterBrand() {
	const dispatch = useDispatch();
	const data = useSelector(state => state.brands);
	let [value, setValue] = useState([]);

	let brandSet = new Set(data);
	var brands = [...brandSet];

	function onChangeHandler(e) {
		setValue(e.target.value);
		dispatch(setFilterBrands(e.target.value));
		dispatch(setPage(0))
	}

	return (
		<div>
			<select onChange={onChangeHandler}>
				<option value=''>All Brands</option>
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
