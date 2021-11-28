import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Catalogue from './components/Catalogue/Catalogue.jsx';
import About from './components/About/About.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

import './App.css'

import Cart from './components/Cart/Cart.jsx';
import Login from './components/Modals/Login.jsx';
import SignUp from './components/Modals/SignUp.jsx';
import { useSelector } from 'react-redux';


function App() {
	// modals need to be here so it can be accesed by all the components
	const modal = useSelector(state => state.modal);

	return (
		
		<BrowserRouter>
		{modal === 'login' && <Login />}
		{modal === 'signUp' && <SignUp />}
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home/>
				</Route>
				<Route exact path='/catalogue'>
					<Catalogue/>
				</Route>
				<Route exact path='/about'>
					<About/>
				</Route>
				<Route exact path='/cart'>
					<Cart/>
				</Route>
			</Switch>
		</BrowserRouter>
		
	);
}

export default App;
