import React from 'react';
import { Link } from 'react-router-dom'


const NavBar = () => {
	return (
		<nav>
			<div class="nav-wrapper">
				<Link to="/" class="brand-logo left ">Instagram</Link>
				<ul id="" class="right ">
					<li><Link to="/signup">Signup</Link></li>
					<li><Link to="/signin">Signin</Link></li>
					<li><Link to="/profile">Profile</Link></li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;