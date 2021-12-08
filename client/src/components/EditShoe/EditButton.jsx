import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './EditButton.module.css';

export default function EditButton({ id }) {
	return (
		<div>
			<Link to={`/editShoe/${id}`}>
				<button className={`${styles.btn_delete}`}>Edit</button>
			</Link>
		</div>
	);
}
