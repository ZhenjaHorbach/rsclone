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
						M.toast({ html: 'data.error', classes: 'red darken-3' });
					} else {
						M.toast({ html: 'Created post Successfully', classes: 'green darken-1' });
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
		<div className='card input-filed' style={{ margin: '10px auto', maxWidth: '500px', textAlign: 'center', padding: '30px' }}>
			<input type='text' placeholder='title' value={title} onChange={(e) => setTitle(e.target.value)} />
			<input type='text' placeholder='body' value={body} onChange={(e) => setBody(e.target.value)} />
			<div className="file-field input-field">
				<div className="btn">
					<span>Upload Image</span>
					<input type="file" onChange={(e) => setImage(e.target.files[0])} />
				</div>
				<div className="file-path-wrapper">
					<input className="file-path validate" type="text" placeholder="Upload one or more files" />
				</div>
			</div>
			<button className="btn waves-effect waves-light blue lighten-2" onClick={() => postDetails()}>
				Submit post
				</button>

		</div>
	);
}

export default NewPost;