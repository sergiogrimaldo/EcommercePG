import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, filterSize } from '../../redux/actions/index.js';
import styles from './FilterSize.module.css';

export default function FilterSize({ data }) {
	const dispatch = useDispatch();
	//const sizes = useSelector(state => state.sizes);
	let [value, setValue] = useState(0); // set value in case we want to make this filter dynamic later
	let sizes = [];
	if (data) {
		data.forEach(element => {
			for (let key in element.AvailableSizes) {
				if (key !== 'id') {
					if (key.includes(',')) {
						sizes.push(Number(key.replace(',', '.')));
					}
					sizes.push(Number(key));
				}
			}
		});
		sizes = [...new Set(sizes)].filter(elem => elem);
		//console.log(sizes);
	}
	function onChangeHandler(e) {
		setValue(e.target.value);
		//console.log(e.target.value);
		dispatch(filterSize(e.target.value));
		dispatch(setPage(0));
	}

	return (
		<div className={`${styles.drop}`}>
			<button className={`${!value && sizes && sizes ? styles.menu : styles.menu_active}`}>{value && sizes && sizes ? value.replace(',', '.') : 'Size'}</button>
			<div className={`${styles.select}`}>
				<button className={`${styles.btn}`} value='' onClick={onChangeHandler}>
					All
				</button>
				{sizes ? (
					sizes
						.sort((a, b) => {
							return a - b;
						})
						.map((elem, index) => (
							<button className={`${styles.btn}`} key={elem + index} value={elem.toString().replace('.', ',')} onClick={onChangeHandler}>
								{elem}
							</button>
						))
				) : (
					<button className={styles.menu}></button>
				)}
			</div>
		</div>
	);
}
