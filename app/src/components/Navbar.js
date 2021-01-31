import React, { useContext, useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { UserContext } from '../App';
import M from 'materialize-css';


const NavBar = () => {
	const searchModal = useRef(null);
	const [search, setSearch] = useState('');
	const [userDetails, setUserDetails] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	useEffect(() => {
		M.Modal.init(searchModal.current)
	}, []);

	const fetchUsers = (query) => {
		setSearch(query)
		fetch('/search-users', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query
			})
		})
			.then(res => res.json())
			.then(result => {
				setUserDetails(result.user);
			})
	};

	const renderList = () => {
		if (state) {
			return [
				<div className='navbar-block'>
					<nav className='navbar'>
						<div className="nav-wrapper">
							<Link to={state ? "/" : '/signin'} className="site-name">Instagram</Link>
							<div className='modal-trigger search' data-target='modal1'><i className='material-icons search-icons' >search</i>Поиск</div>
							<ul id="" className="right navbar-panel">
								<li key='home' data-title="Домой"><Link to={state ? "/" : '/signin'} ><img src="https://img.icons8.com/fluent-systems-filled/24/000000/home.png" /></Link></li>,
								<li key='newpost' data-title="Фото друзей"><Link to="/myfollowingpost"><img src="https://img.icons8.com/fluent-systems-regular/24/000000/hearts.png" /></Link></li>,
								<li key='profile' data-title="Профиль"><Link to="/profile"><img src="https://img.icons8.com/material-outlined/24/000000/user-female-circle.png" /></Link></li>,
				<li key='create' data-title="Новый пост"><Link to="/create"><img src="https://img.icons8.com/material-two-tone/24/000000/plus-math--v1.png" /></Link></li>,
				<li key='logout' data-title="Выход"><Link to="/signin"><img src="https://img.icons8.com/fluent-systems-filled/24/000000/exit.png" onClick={() => {
									localStorage.clear()
									dispatch({ type: 'CLEAR' })
									history.push('/signin')
								}}
								/>
								</Link>
								</li>
							</ul>
						</div>
						<div id="modal1" className="modal" ref={searchModal} style={{ color: 'black', transform: 'none' }}>
							<div className="modal-content" style={{ color: 'black' }}>

								<input type='text' placeholder='Поиск' value={search} onChange={(e) => fetchUsers(e.target.value)} />
								<ul className="collection">
									{userDetails.map(item => {
										return <Link onClick={() => {
											M.Modal.getInstance(searchModal.current).close();
											if (item._id !== state._id) {
												history.push(`/profile`);
												setTimeout(() => {
													history.push('/profile/' + item._id);
												}, 10);
											} else {
												history.push(`/profile`)
											}
										}}> <div className="collection-item" >
												<img src={item.pic} />
												<div>
													<p>{item.name}</p>
													<p>{item.email}</p>
												</div>
											</div>



										</Link>
									})}

								</ul>
							</div>
							<div className="modal-footer">
								<button className="modal-close exit-button" onClick={() => setSearch('')}>Выйти</button>
							</div>
						</div>
					</nav >
				</div>
			]
		}
	}

	return [renderList()];
}

export default NavBar;