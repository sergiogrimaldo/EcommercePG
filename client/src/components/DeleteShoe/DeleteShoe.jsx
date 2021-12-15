import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { openModal, deleteId } from '../../redux/actions/index.js';
import styles from './DeleteShoe.module.css';
import DeleteModal from '../Modals/DeleteModal.jsx';

export default function DeleteShoe({ id }) {
	const history = useHistory();
	const dispatch = useDispatch();

	// function sleep(ms) {
	// 	return new Promise(resolve => setTimeout(resolve, ms));
	// }

	function onClickHandler(e) {
		// console.log(e.target.value);
		//console.log(e.target.value)
		dispatch(deleteId(e.target.value));
		dispatch(openModal('delete'));
	}

	return (
		<div>
			<button className={`${styles.btn_delete}`} value={id} onClick={onClickHandler}>
				X
			</button>
		</div>
	)
}