import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';

const Signin = () => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const PostData = () => {
		if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
			M.toast({ html: 'Неверный email', classes: 'red darken-3' });
			return;
		}
		fetch('/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				password,
				email
			})
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				if (data.error) {
					M.toast({ html: data.error, classes: 'red darken-3' });
				} else {
					localStorage.setItem('jwt', data.token);
					localStorage.setItem('user', JSON.stringify(data.user));
					dispatch({ type: 'USER', payload: data.user });
					history.push('/');
				}
			})
			.catch(err => {
				console.log(err);
			});
	};
	return (
		<div className='my-card'>
			<div className='my-card__body'>
				<h2 className='my-card__name'>Instagram</h2>
				<input type='text' placeholder='Электронный адрес' value={email} onChange={(e) => setEmail(e.target.value)} id='my-card__input' />
				<input type='password' placeholder='Пароль' value={password} onChange={(e) => setPassword(e.target.value)} id='my-card__input' />
				<button onClick={() => PostData()} id='my-card__button'>
					Войти
				</button>
			</div>
			<div className='my-card__body'>
				<p className='my-card__reset'>У вас ещё нет аккаунта? <Link to='/signup'>Зарегистрироваться</Link></p>
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

export default Signin;