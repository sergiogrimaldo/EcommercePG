import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, filterSize } from '../../redux/actions/index.js';

export default function FilterSize() {
	const dispatch = useDispatch();
	const sizes = useSelector(state => state.sizes);
	let [value, setValue] = useState(0); // set value in case we want to make this filter dynamic later

	function onChangeHandler(e) {
		setValue(e.target.value);
		dispatch(filterSize(e.target.value));
		dispatch(setPage(0));
	}

	return (
		<div>
			<select onChange={onChangeHandler}>
				<option value={0}>{sizes > 0 ? value : '---Filter By Size---'}</option>
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
