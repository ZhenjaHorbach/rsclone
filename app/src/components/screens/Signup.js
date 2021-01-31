import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';

const Signup = () => {
	const history = useHistory();
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [image, setImage] = useState('');
	const [url, setUrl] = useState(undefined);
	useEffect(() => {
		if (url) {
			uploadFields()
		}
	}, [url]);

	const uploadPic = () => {
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
				setUrl(data.url);
			})
			.catch(err => {
				console.log(err);
			});
	}
	const uploadFields = () => {
		if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
			M.toast({ html: 'Неверный email', classes: 'red darken-3' });
			return;
		}
		fetch('/signup', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name,
				password,
				email,
				pic: url
			})

		})
			.then(res => res.json())
			.then(data => {
				if (data.error) {
					M.toast({ html: data.error, classes: 'red darken-3' });
				} else {
					M.toast({ html: data.message, classes: 'green darken-1' });
					history.push('/signin');
				}
			})
			.catch(err => {
				console.log(err);
			})
	};

	const PostData = () => {
		if (image) {
			uploadPic();
		} else {
			uploadFields();
		}
	};

	return (
		<div className='my-card'>
			<div className='my-card__body'>
				<h2 className='my-card__name'>Instagram</h2>
				<p className='my-card__info'>Зарегистрируйтесь, чтобы смотреть фото и видео ваших друзей.</p>
				<input type='text' placeholder='Электронный адрес' value={email} onChange={(e) => setEmail(e.target.value)} id='my-card__input' />
				<input type='text' placeholder='Имя пользователя' value={name} onChange={(e) => setName(e.target.value)} id='my-card__input' />
				<input type='password' placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} id='my-card__input' />
				<div >
					<div className='my-card__load-file' >
						<p >Загрузка аватарки</p>
						<input type="file" onChange={(e) => setImage(e.target.files[0])} />
					</div>
				</div>
				<button onClick={() => PostData()} id='my-card__button'>
					Регистрация
			</button>
				<p className='my-card__otherinfo'>Регистрируясь, я обещаю ,что не буду пользоваться вашими личными данными, тем более вы не обязуетесь вводить существующий эллектронный адрес =3 </p>
			</div>
			<div className='my-card__body'>
				<p className='my-card__reset'>Есть аккаунт? <Link to='/signin'>Вход</Link></p>
			</div>
			<div className='my-card__links'>
				<p className='my-card__links-name'>Установите приложение.</p>
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
	);
}

export default Signup;