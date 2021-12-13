import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { search } from '../../redux/actions';
import './search.css'
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
		<div className='search'>
			<form style={{display:'flex', width: '100%'}} onSubmit={onSubmitHandler}>
				<input style={{borderTopLeftRadius:15, borderBottomLeftRadius:15,width:'90%',padding:5}} type='text' value={input} onChange={onChangeHandler} />
				<button style={{borderTopRightRadius:15, borderBottomRightRadius:15}} type='submit'>Search</button>
			</form>
		</div>
	);
}
