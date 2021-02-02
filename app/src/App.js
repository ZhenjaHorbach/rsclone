import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { useEffect, createContext, useReducer, useContext } from 'react';

import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/screens/Home';
import Signin from './components/screens/Login';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import NewPost from './components/screens/NewPost';
import OtherUsers from './components/screens/OtherUsers';
import Subscribes from './components/screens/Subscribes';
import { reducer, initialState } from './components/reducers/userReducer';

export const UserContext = createContext();
const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			dispatch({ user: 'USER', payload: user });

		} else {
			history.push('/signin');
		}
	}, [])
	return (
		<Switch>
			<Route exact path='/'>
				<Home />
			</Route>
			<Route path='/signin'>
				<Signin />
			</Route>
			<Route exact path='/profile'>
				<Profile />
			</Route>
			<Route path='/signup'>
				<Signup />
			</Route>
			<Route path='/create'>
				<NewPost />
			</Route>
			<Route path='/profile/:userid'>
				<OtherUsers />
			</Route>
			<Route path='/myfollowingpost'>
				<Subscribes />
			</Route>
		</Switch>
	)
}

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<NavBar />
				<Routing />
				<Footer />
			</BrowserRouter>
		</UserContext.Provider>

	);
}

export default App;
