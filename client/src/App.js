import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cards from './components/Cards/Cards';
import Header from './components/Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import SignUp from './components/Modals/SignUp';
import Login from './components/Modals/Login';
import { getShoes } from './redux/actions';

function App() {
	const modal = useSelector(state => state.modal);
	const data = useSelector(state => state.shoes);
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getShoes());
		console.log(data)
	}, []);

	return (
		<BrowserRouter>
			{modal === 'login' && <Login />}
			{modal === 'signUp' && <SignUp />}

			<div className='App'>
				{ data && data.length>0 && <>
				<Header data={data} />
				<Cards data={data} />
				</>
				}
			</div>
		</BrowserRouter>
	);
}

export default App;
