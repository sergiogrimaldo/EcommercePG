import { useState } from 'react';

export default function Searchbar({ onSearch }) {
	let [input, setInput] = useState('');

	function onChangeHandler(e) {
		setInput(e.target.value);
	}

	function onSubmitHandler(e) {
		e.preventDefault();
		onSearch(input);
		setInput('');
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
