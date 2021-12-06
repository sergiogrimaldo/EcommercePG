import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteShoe } from '../../redux/actions/index.js';
import styles from './DeleteShoe.module.css';

export default function DeleteShoe({ id }) {
	const history = useHistory();
	const dispatch = useDispatch();

	function onClickHandler() {
		dispatch(deleteShoe(id));
		history.push('/');
	}

	return (
		<div>
			<button className={`${styles.btn_delete}`} onClick={onClickHandler}>
				X
			</button>
		</div>
	);
}
