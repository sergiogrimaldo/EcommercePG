import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import Catalogue from './components/Catalogue/Catalogue.jsx';
import Checkout from './components/Modals/Checkout.jsx';
import About from './components/About/About.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import CheckoutForm from './components/CheckoutForm/CheckoutForm.jsx';
import Cart from './components/Cart/Cart.jsx';
import BuyDetailsModal from './components/Modals/BuyDetailsModal.jsx';
import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Modals/Login.jsx';
import SignUp from './components/Modals/SignUp.jsx';
import Detail from './components/Detail/Detail.jsx';
import MyAccount from './components/MyAccount/MyAccount.jsx';
import AdminControlPanel from './components/AdminControlPanel/AdminControlPanel';
import OrderDetails from './components/OrderDetails/OrderDetails.jsx';
import AddShoe from './components/AddShoe/AddShoe.jsx';
import EditShoe from './components/EditShoe/EditShoe.jsx';
import { Redirect } from 'react-router-dom';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import RequestResetPassword from './components/ResetPassword/RequestResetPassword.jsx';
import DeleteModal from './components/Modals/DeleteModal.jsx';
import AccountActivation from './components/AccountActivation/AccountActivation.jsx';
import WishList from './components/WishList/WishList'


function App() {
	// modals need to be here so it can be accesed by all the components
	const modal = useSelector(state => state.modal);
	const modalData = useSelector(state => state.modalBuyDetails);
	// const deleteId = useSelector(state => state.deleteId);
	
	return (
		<>
	
		<BrowserRouter>
			{modal === 'checkout' && <Checkout />}
			{modal === 'login' && <Login />}
			{modal === 'signUp' && <SignUp />}
			{modal === 'BuyDetailsModal' && <BuyDetailsModal data={modalData} />}
			{modal === 'delete' && <DeleteModal/>}
			
			{/* <div style={{height:'100vh', backgroundColor:'black', color:'white'}}>
				WishList
				{ console.log(wishList)}
				{ wishList && JSON.stringify(wishList).length > 2 && wishList.shoes.map((shoe) => <div style={{display:'flex', alignItems:'center'}}>
					<img src={shoe.thumbnail} width='250px'/>
					<div>{shoe.shoeName}</div>
					<div>
						<button id={shoe.id} onClick={() => handleDeleteClick(shoe.id)}>❌{shoe.id}</button> 
					</div>
					</div> )}

		</div> */}
			<Navbar />

			<Switch>
				<Route exact path='/checkout' component={CheckoutForm} />
				<Route exact path='/wishList'>
					<WishList />
				</Route>
				<Route exact path='/home'>
					<Home />
				</Route>
				<Route exact path='/'>
					<Redirect to='home' />
				</Route>
				<Route exact path='/adminCPanel'>
					<AdminControlPanel />
				</Route>
				<Route exact path='/myAccount'>
					<MyAccount />
				</Route>
				<Route exact path='/catalogue'>
					<Catalogue />
				</Route>
				<Route exact path='/about'>
					<About />
				</Route>
				<Route exact path='/cart'>
					<Cart />
				</Route>
				<Route exact path='/shoe/:id' render={({ match }) => <Detail id={match.params.id} />} />
				<Route exact path='/orders/:id' render={({ match }) => <OrderDetails id={match.params.id} />} />

				<Route path='/' exact component={Home} />

				<Route exact path='/catalogue' component={Catalogue} />

				<Route exact path='/about' component={About} />
				<Route exact path='/addShoe' component={AddShoe} />
				<Route exact path='/editShoe/:id' render={({ match }) => <EditShoe id={match.params.id} />} />
				<Route exact path='/users/resetPassword' component={RequestResetPassword} />
				<Route exact path='/users/resetPassword/:token' render={({ match }) => 
					<ResetPassword token={match.params.token} />} />
				<Route exact path='/users/activate/:token' render={({ match }) => 
					<AccountActivation token={match.params.token} />} />
			</Switch>
		</BrowserRouter>
		</>
	);
}

export default App;
