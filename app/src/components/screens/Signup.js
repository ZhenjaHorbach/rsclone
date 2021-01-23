import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
	return (
		<div className='mycard'>
			<div className="card auth-card input-field">
				<h2>Instagram</h2>
				<input type='text' placeholder='name' />
				<input type='text' placeholder='email' />
				<input type='text' placeholder='password' />
				<button className="btn waves-effect waves-light blue lighten-2">
					SignUp
			</button>
				<h6>
					<Link to='/signin'>Already have an account ?</Link>
				</h6>
			</div>
		</div>
	);
}

export default Signup;