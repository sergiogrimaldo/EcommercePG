import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage, filterSize } from '../../redux/actions/index.js';
import styles from './FilterSize.module.css';

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
		<div className={`${styles.drop}`}>
			<button
				className={`${!value && sizes ? styles.menu : styles.menu_active}`}>
				{value && sizes ? value : 'Size'}
			</button>
			<div className={`${styles.select}`}>
				<button className={`${styles.btn}`} value='' onClick={onChangeHandler}>
					All
				</button>
				{sizes ? (
					sizes.map((elem, index) => (
						<button
							className={`${styles.btn}`}
							key={elem + index}
							value={elem}
							onClick={onChangeHandler}>
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
