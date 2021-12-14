/* import React, { useEffect } from 'react'; */
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './EditButton.module.css';
import { clearShoeDetails, getShoeDetails } from '../../redux/actions';

export default function EditButton({ id }) {
	const dispatch = useDispatch();

	function clickHandler() {
		dispatch(clearShoeDetails());
		dispatch(getShoeDetails(id));
	}

	return (
		<div>
			<Link to={`/editShoe/${id}`}>
				<button className={`${styles.btn_delete}`} onClick={clickHandler}>
					Edit
				</button>
			</Link>
		</div>
	);
}
