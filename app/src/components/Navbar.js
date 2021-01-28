import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../App';
import M from 'materialize-css';


const NavBar = () => {
	const searchModal = useRef(null);
	const [search, setSearch] = useState('');
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	useEffect(() => {
		M.Modal.init(searchModal.current)
	}, [])

	const renderList = () => {
		if (state) {
			return [
				<li key='search'><i data-target='modal1' className='large material-icons modal-trigger' >search</i></li>,
				<li key='profile'><Link to="/profile">Profile</Link></li>,
				<li key='create'><Link to="/create">New Post</Link></li>,
				<li key='newpost'><Link to="/myfollowingpost">My following Posts</Link></li>,
				<li key='logout'><button className="btn waves-effect waves-light blue lighten-2" onClick={() => {
					localStorage.clear()
					dispatch({ type: 'CLEAR' })
					history.push('/signin')
				}}
				>Logout</button>
				</li>
			]
		} else {
			return [
				<li key='signup'><Link to="/signup">Signup</Link></li>,
				<li key='signin'><Link to="/signin">Signin</Link></li>
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
			<div id="modal1" className="modal" ref={searchModal} style={{ color: 'black' }}>
				<div className="modal-content" style={{ color: 'black' }}>
					<input type='text' placeholder='search' value={search} onChange={(e) => setSearch(e.target.value)} />
					<ul className="collection">
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
						<li className="collection-item" style={{ width: '100 %' }}>Alvin</li>
					</ul>
				</div>
				<div className="modal-footer">
					<button className="modal-close waves-effect waves-green btn-flat">Agree</button>
				</div>
			</div>
		</nav>
	);
}

export default NavBar;