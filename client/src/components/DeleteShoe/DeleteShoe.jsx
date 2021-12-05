import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteShoe } from '../../redux/actions/index.js';

export default function DeleteShoe({ id }) {
	const history = useHistory();
	const dispatch = useDispatch();

	function onClickHandler() {
		dispatch(deleteShoe(id));
		history.push('/');
	}

	return (
		<div>
			<button onClick={onClickHandler}>X</button>
		</div>
	);
}
