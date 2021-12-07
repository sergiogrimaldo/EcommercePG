import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteShoe, getShoes } from '../../redux/actions/index.js';
import styles from './DeleteShoe.module.css';

export default function DeleteShoe({ id }) {
	const history = useHistory();
	const dispatch = useDispatch();

	function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

	async function onClickHandler() {
		await dispatch(deleteShoe(id))
		await sleep(1000)
		await dispatch(getShoes())
	}

	return (
		<div>
			<button className={`${styles.btn_delete}`} onClick={onClickHandler}>
				X
			</button>
		</div>
	);
}
