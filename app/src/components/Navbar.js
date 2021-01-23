import React from 'react';
import { Link } from 'react-router-dom'


const NavBar = () => {
	return (
		<nav>
			<div className="nav-wrapper">
				<Link to="/" className="brand-logo left">Instagram</Link>
				<ul id="" className="right ">
					<li><Link to="/signup">Signup</Link></li>
					<li><Link to="/signin">Signin</Link></li>
					<li><Link to="/profile">Profile</Link></li>
					<li><Link to="/create">New Post</Link></li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;