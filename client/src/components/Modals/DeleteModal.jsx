import styles from './DeleteModal.module.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteShoe, getShoes, closeModal } from '../../redux/actions/index.js';

export default function DeleteModal({ deleteId }) {
	const history = useHistory();
	const dispatch = useDispatch();
	// const id = useSelector(state => state.deleteId);

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function onClickHandler(e) {
		if (e.target.value == 1) {
			await dispatch(deleteShoe(deleteId));
			await sleep(500);
			await dispatch(getShoes());
		}
		dispatch(closeModal());
	}
	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.box}`}>
				<span>Do you really want to remove this item from the database?</span>
				<div className={`${styles.btn_box}`}>
					<button className={`${styles.btn}`} value={1} onClick={onClickHandler}>
						Yes
					</button>
					<button className={`${styles.btn}`} value={2} onClick={onClickHandler}>
						No
					</button>
				</div>
			</div>
		</div>
	);
}