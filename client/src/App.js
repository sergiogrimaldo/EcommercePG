import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Catalogue from './components/Catalogue/Catalogue.jsx';
import Checkout from './components/Modals/Checkout.jsx';
import About from './components/About/About.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import CheckoutForm from './components/CheckoutForm/CheckoutForm.jsx';
import './App.css'
import Cart from './components/Cart/Cart.jsx';
import BuyDetailsModal from './components/Modals/BuyDetailsModal.jsx';
import { useSelector } from 'react-redux';
import './App.css'
import Login from './components/Modals/Login.jsx';
import SignUp from './components/Modals/SignUp.jsx';


function App() {
	// modals need to be here so it can be accesed by all the components
	const modal = useSelector(state => state.modal);
    const modalData = useSelector(state => state.modalBuyDetails);

	return (
		
		<BrowserRouter>
		{modal === 'checkout' && <Checkout />}
		{modal === 'login' && <Login />}
		{modal === 'signUp' && <SignUp />}
        {modal === 'BuyDetailsModal' && <BuyDetailsModal data={modalData} />}

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
				<Route exact path='/checkout'>
					<CheckoutForm/>
				</Route>
			</Switch>
		</BrowserRouter>
		
	);
}

export default App;
