import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import M from 'materialize-css';
import { useHistory } from 'react-router-dom';

const NewPost = () => {
	const history = useHistory();
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [image, setImage] = useState('');
	const [url, setUrl] = useState('');
	
	useEffect(() => {
		if (url) {
			fetch('/createpost', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + localStorage.getItem('jwt')
				},
				body: JSON.stringify({
					title,
					body,
					pic: url
				})
			})
				.then(res => res.json())
				.then(data => {
					if (data.error) {
						M.toast({ html: data.error, classes: 'red darken-3' });
					} else {
						history.push('/');
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	}, [url])

	const postDetails = () => {
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

	return (

		<div className='mainpaig mainpaig__newpost'>
			<h1>Новый пост</h1>
			<input type='text' placeholder='Название поста' value={title} onChange={(e) => setTitle(e.target.value)} id='my-card__input' />
			<input type='text' placeholder='Описание' value={body} onChange={(e) => setBody(e.target.value)} id='my-card__input' />
			<div className="file-field input-field">
				<div className='my-card__load-file' >
					<p >Загрузка фото</p>
					<input type="file" onChange={(e) => setImage(e.target.files[0])} placeholder='Электронный адрес' />
				</div>

			</div>
			<button className="btn waves-effect waves-light blue lighten-2 " id='my-card__button' onClick={() => postDetails()}>
				Загрузить пост
				</button>

		</div>
	);
}

export default NewPost;