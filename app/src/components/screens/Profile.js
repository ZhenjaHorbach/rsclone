import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
	const [mypics, setPics] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		fetch('/mypost', {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			}
		})
			.then(res => res.json())
			.then(res => {
				setPics(res.mypost);
			})

	}, [])
	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0 ', borderBottom: '1px solid black' }}>
				<div>
					<img style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'red' }} />
				</div>
				<div>

					<h4>{state ? state.name : 'loading'}</h4>
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '110%' }}>
						<h6>0 followers</h6>
						<h6>0 following</h6>
						<h6>0 posts</h6>
					</div>
				</div>
			</div>
			<div className='gallery'>
				{
					mypics.map(item => {
						return (
							<img className='gallery__item' src={item.photo} alt={item.title} key={item._id} />
						)
					})
				}
			</div>
		</div>
	);
}

export default Profile;