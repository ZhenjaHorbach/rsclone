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
				<div className='mainpaig'>
					<div className='profile'>
						<img className='profile-img' src={userProfile.user.pic} />
						<div className='profile-info'>
							<div className='profile-name'>
								<h4>{userProfile.user.name}</h4>
								<div className="file-field input-field">
									{showfollow ?
										<button className="btn waves-effect waves-light blue lighten-2 follow-btn" onClick={() => followUser()}>Подписаться</button>
										:
										<button className="btn waves-effect waves-light blue lighten-2 follow-btn" onClick={() => unfollowUser()}>Отписаться</button>
									}
								</div>
							</div>
							<div className='profile-email'>
								<h5>{userProfile.user.email}</h5>
							</div>
							<div className='profile-state'>
								<h6><span>{userProfile.posts.length}</span> публикаций</h6>
								<h6><span>{userProfile.user.followers.length}</span> подписчиков</h6>
								<h6><span>{userProfile.user.following.length}</span> подписок</h6>
							</div>
						</div>
					</div>
					<div className='gallery'>
						{
							userProfile.posts.length !== 0 ? userProfile.posts.map(item => {
								return (
									<div className='gallery__item' style={{ backgroundImage: `url(${item.photo})` }}></div>
								)
							}) :
								<div className='empty-gallery'>
									<div className='empty-gallery__img'>
										<img src='https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg' />
									</div>
									<div className='empty-gallery__info'>
										<div className='empty-gallery__text'>
											<h4>Похоже здесь пусто</h4>
											<p>Попросите своего друга добавить фото или видео через приложение.</p>
										</div>
										<div className='my-card__links-items'>
											<a href='https://apps.apple.com/app/instagram/id389801252?vt=lo'>
												<img alt="Доступно в Магазине приложений" src='https://www.instagram.com/static/images/appstore-install-badges/badge_ios_russian-ru.png/bfba6d0fd6bd.png' />
											</a>
											<a href='https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D1E40E913-6051-4299-B2C6-BFB437DA24F2%26utm_content%3Dlo%26utm_medium%3Dbadge'>
												<img alt="Доступно в Google Play" src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_russian-ru.png/4c70948c09f3.png" />
											</a>
										</div>
									</div>
								</div>

						}
					</div>
				</div>
				: <h2 className='load'>Загрузка</h2>}

		</>
	);
}

export default Profile;