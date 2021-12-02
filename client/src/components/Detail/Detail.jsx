import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getShoeDetails } from '../../actions/index.js';

export default function Detail({ id }) {
	const dispatch = useDispatch();
	const details = useSelector(state => state.shoeDetails);

	useEffect(() => {
		dispatch(getShoeDetails(id));
	}, [id, dispatch]);

	return (
		<div>
			<h1>{details.shoeName}</h1>
			<img src={details.thumbnail} alt='Not found' />
			<div>{details.description}</div>
		</div>
	);
}
