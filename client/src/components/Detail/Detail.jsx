import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShoeDetails } from '../../redux/actions/index.js';
import styles from './Detail.module.css';
export default function Detail({ id }) {
	const dispatch = useDispatch();
	const details = useSelector(state => state.shoeDetails);

	useEffect(() => {
		dispatch(getShoeDetails(id));
	}, [dispatch]);

	return (
		<div>
			<h1>{details && details.shoeName}</h1>
			<img className={`${styles.img_detail}`} src={details && details.thumbnail} alt='Not found' />
			<div>{details && details.description}</div>
		</div>
	);
}
