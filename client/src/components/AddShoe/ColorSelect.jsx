import { /* useEffect, */ useState } from 'react';
import { deleteAllRepited, splitAll, deleteWord, findGrid, filter } from '../FilterColor/colors';
import styles from './AddShoe.module.css';
import { useDispatch, useSelector } from 'react-redux';

const ColorSelect = ({ input, handleColors }) => {
	// const [value, setValue] = useState('');
	const data = useSelector(state => state.shoes);
	let clean = [];
	// shoes = [];

	if (data && input) {
		let array = splitAll(data);
		clean = deleteAllRepited(array).filter(elem => elem.toLowerCase().includes(input.toLowerCase()));
		// shoes = filter(array, value);
		// shoes.forEach(e => {
		// 	//console.log(e.id);
		// }); // esto es para traer las zapatillas que coinciden con el filtro por id
	}

	// const onChangeHandler = e => {
	// 	setValue(e.target.value);
	// };

	const clickHandler = e => {
		handleColors(e.target.value);
	};

	return (
		<div className={`${clean.length < 195 && input ? styles.sizebox : styles.hide}`}>
			{clean ? (
				clean
					.map(
						(elem, index) =>
							!deleteWord.includes(elem) && (
								// <div
								// 	key={elem + index}
								// 	value={elem}
								// style={{
								// 	backgroundColor: findGrid(elem),
								// }}>
								// 	{elem[0].toUpperCase() + elem.slice(1)}
								// </div>

								<button
									value={elem}
									style={{
										width: 70,
										height: 30,
										backgroundColor: findGrid(elem),
										margin: 10,
									}}
									className={`${styles.btn_color}`}
									onClick={clickHandler}
									key={elem + index}>
									{elem[0].toUpperCase() + elem.slice(1)}
								</button>
							)
					)
					.slice(0, 12)
			) : (
				<div></div>
			)}
		</div>
	);
};

export default ColorSelect;
