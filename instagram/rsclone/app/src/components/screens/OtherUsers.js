import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useParams } from 'react-router-dom';

const Profile = () => {
	const [userProfile, setProfile] = useState(null);
	const { state, dispatch } = useContext(UserContext);
	const { userid } = useParams();
	const [showfollow, setShowFollow] = useState(state ? !state.following.includes(userid) : true);

	useEffect(() => {
		fetch(`/user/${userid}`, {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			}
		})
			.then(res => res.json())
			.then(res => {
				setProfile(res);

			})

	}, []);

	const followUser = () => {
		fetch('/follow', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			},
			body: JSON.stringify({
				followId: userid
			})
		})
			.then(res => res.json())
			.then(data => {
				dispatch({ type: 'UPDATE', payload: { following: data.following, followers: data.followers } });
				localStorage.setItem('user', JSON.stringify(data));
				setProfile((prevState) => {
					return {
						...prevState,
						user: {
							...prevState.user,
							followers: [...prevState.user.followers, data._id]
						}
					};
				});
				setShowFollow(false);
			});
	};



	const unfollowUser = () => {
		fetch('/unfollow', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			},
			body: JSON.stringify({
				unfollowId: userid
			})
		})
			.then(res => res.json())
			.then(data => {
				dispatch({ type: 'UPDATE', payload: { following: data.following, followers: data.followers } });
				localStorage.setItem('user', JSON.stringify(data));
				setProfile((prevState) => {
					const newFollower = prevState.user.followers.filter(item => item != data._id);
					return {
						...prevState,
						user: {
							...prevState.user,
							followers: newFollower
						}
					};
				});
				setShowFollow(true);
			});
	};


	return (
		<>
			{userProfile ?
				<div>
					<div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0 ', borderBottom: '1px solid black' }}>
						<div>
							<img style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'red' }} src={userProfile.user.pic} />
						</div>
						<div>

							<h4>{userProfile.user.name}</h4>
							<h5>{userProfile.user.email}</h5>
							<div style={{ display: 'flex', justifyContent: 'space-between', width: '110%' }}>
								<h6>{userProfile.posts.length} posts</h6>
								<h6>{userProfile.user.followers.length} followers</h6>
								<h6>{userProfile.user.following.length} following</h6>
							</div>
							{showfollow ?
								<button className="btn waves-effect waves-light blue lighten-2" onClick={() => followUser()}>Follow</button>
								:
								<button className="btn waves-effect waves-light blue lighten-2" onClick={() => unfollowUser()}>unFollow</button>
							}
						</div>
					</div>
					<div className='gallery'>
						{
							userProfile.posts.map(item => {
								return (
									<img className='gallery__item' src={item.photo} alt={item.title} key={item._id} />
								)
							})
						}
					</div>
				</div>
				: <h2>Loading!!!</h2>}

		</>
	);
}

export default Profile;