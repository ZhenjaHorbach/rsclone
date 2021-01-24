import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../App';


const NavBar = () => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const renderList = () => {
		if (state) {
			return [
				<li><Link to="/profile">Profile</Link></li>,
				<li><Link to="/create">New Post</Link></li>,
				<li><button className="btn waves-effect waves-light blue lighten-2" onClick={() => {
					localStorage.clear()
					dispatch({ type: 'CLEAR' })
					history.push('/signin')
				}}
				>Logout</button>
				</li>
			]
		} else {
			return [
				<li><Link to="/signup">Signup</Link></li>,
				<li><Link to="/signin">Signin</Link></li>
			]
		}
	}
	return (
		<nav>
			<div className="nav-wrapper">
				<Link to={state ? "/" : '/signin'} className="brand-logo left">Instagram</Link>
				<ul id="" className="right ">
					{renderList()}
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;