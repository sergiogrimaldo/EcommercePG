import { useState } from 'react';
import {useDispatch} from 'react-redux'
import { search } from '../../redux/actions';
export default function Searchbar() {
	let [input, setInput] = useState('');
	let dispatch = useDispatch()

	function onChangeHandler(e) {
		setInput(e.target.value);
	}

	function onSubmitHandler(e) {
		e.preventDefault();
		dispatch(search(input))
		console.log(input)
		//setInput('');
	}

	return (
			<div>
				<form onSubmit={onSubmitHandler}>
					<input type='text' value={input} onChange={onChangeHandler} />
					<button type='submit'>Search</button>
				</form>
			</div>
		
	);
}
