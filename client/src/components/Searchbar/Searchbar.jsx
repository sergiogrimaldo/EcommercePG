import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../redux/actions';
export default function Searchbar() {
	let [input, setInput] = useState('');
	let dispatch = useDispatch();

	function onChangeHandler(e) {
		setInput(e.target.value);
	}

	function onSubmitHandler(e) {
		e.preventDefault();
		dispatch(search(input));
	}

	return (
		<div>
			<form style={{display:'flex', width: '150%'}} onSubmit={onSubmitHandler}>
				<input style={{borderTopLeftRadius:15, borderBottomLeftRadius:15, width:'100%', padding:5}} type='text' value={input} onChange={onChangeHandler} />
				<button type='submit'>Search</button>
			</form>
		</div>
	);
}
