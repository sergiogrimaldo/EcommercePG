import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cards from './components/Cards/Cards';
import Header from './components/Header/Header';
import { useSelector } from 'react-redux';
import SignUp from './components/Modals/SignUp';
import Login from './components/Modals/Login';


function App() {
	const modal = useSelector((state) => state.modal)
	const [data, setData] = useState([]);

	const getData = () => {
		fetch('shoes.json', {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then(function (response) {
				return response.json();
			})
			.then(function (myJson) {
				console.log(myJson);
				setData(myJson);
			});
	};
	useEffect(() => {
		getData();
	}, []);


	return (
		<BrowserRouter>
      	{modal === 'login' && <Login/> }
		{modal === 'signUp' && <SignUp/> }
			<div className='App'>
				<Header data={data} />
				<Cards data={data}/>
			</div>
		</BrowserRouter>
	);


}

export default App;
