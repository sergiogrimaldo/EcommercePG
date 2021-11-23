import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from './components/Card/Card';
import Header from './components/Header/Header';

function App() {
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
			<div className='App'>
				<Header data={data} />
				{data && data.length > 0 && data.map(shoe => <Card shoe={shoe} />)}
			</div>
		</BrowserRouter>
	);
}

export default App;
