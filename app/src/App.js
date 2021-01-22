import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/screens/Home';
import Signin from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Route exact path='/'>
				<Home />
			</Route>
			<Route path='/signin'>
				<Signin />
			</Route>
			<Route path='/profile'>
				<Profile />
			</Route>
			<Route path='/signup'>
				<Signup />
			</Route>
			<Footer />
		</BrowserRouter>

	);
}

export default App;
