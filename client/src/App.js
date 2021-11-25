import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HeroSection from './components/HeroSection/HeroSection.jsx';
import Catalogue from './components/Catalogue/Catalogue.jsx';
import About from './components/About/About.jsx';
import Navbar from './components/Navbar/Navbar.jsx';


function App() {

	return (
		<BrowserRouter>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<HeroSection />
				</Route>
				<Route exact path='/catalogue'>
					<Catalogue/>
				</Route>
				<Route exact path='/about'>
					<About/>
				</Route>
			</Switch>
		</BrowserRouter>
		
	);
}

export default App;
