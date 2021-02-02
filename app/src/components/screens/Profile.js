import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
	const [mypics, setPics] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const [image, setImage] = useState('');

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
	useEffect(() => {
		if (image) {
			const data = new FormData();
			data.append('file', image);
			data.append('upload_preset', 'rsclone');
			data.append('cloud_name', 'dqzybcpps');

			fetch('	https://api.cloudinary.com/v1_1/dqzybcpps/image/upload', {
				method: 'post',
				body: data
			})
				.then(res => res.json())
				.then(data => {
					fetch('/updatepic', {
						method: 'put',
						headers: {
							'Content-Type': 'application/json',
							'Authorization': 'Bearer ' + localStorage.getItem('jwt')
						},
						body: JSON.stringify({
							pic: data.url
						})

					}).then(res => res.json())
						.then(result => {
							localStorage.setItem('user', JSON.stringify({ ...state, pic: result.pic }));
							dispatch({ type: 'UPDATEPIC', payload: result.pic });
						});

				})
				.catch(err => {
					console.log(err);
				});

		}
	}, [image]);


	const updatePhoto = (file) => {
		setImage(file);
	}
	return (
		<div className='mainpaig'>
			<div className='profile'>
				<img className='profile-img' src={state ? state.pic : 'loading'} />
				<div className='profile-info'>
					<div className='profile-name'>
						<h4 >{state ? state.name : 'loading'}</h4>
						<div className="file-field input-field">
							<div className="btn">
								<span>Сменить фото</span>
								<input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
							</div>
						</div>

					</div>
					<div className='profile-email'>
						<h5>{state ? state.email : 'loading'}</h5>
					</div>
					<div className='profile-state'>
						<h6 ><span>{mypics.length}</span> публикаций</h6>
						<h6><span>{state ? state.followers.length : '0'}</span> подписчиков</h6>
						<h6><span>{state ? state.following.length : '0'}</span> подписок</h6>
					</div>
				</div>
			</div>
			<div className='gallery'>
				{

					mypics.length !== 0 ? mypics.map(item => {
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
									<h4>Делитесь тем, что вы видите.</h4>
									<p>Поделитесь своим первым фото или видео через приложение.</p>
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
		</div >
	);
}

export default Profile;