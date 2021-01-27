import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../App';

const Profile = () => {
	const [mypics, setPics] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const [image, setImage] = useState('');

	console.log(state);
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
							console.log(result);
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
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0 ', borderBottom: '1px solid black' }}>
				<div>
					<img style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'red' }} src={state ? state.pic : 'loading'} />
					<div className="file-field input-field">
						<div className="btn">
							<span>Update Image</span>
							<input type="file" onChange={(e) => updatePhoto(e.target.files[0])} />
						</div>
						<div className="file-path-wrapper">
							<input className="file-path validate" type="text" placeholder="Upload one or more files" />
						</div>
					</div>
				</div>
				<div>

					<h4>{state ? state.name : 'loading'}</h4>
					<h5>{state ? state.email : 'loading'}</h5>
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '110%' }}>
						<h6>{mypics.length} posts</h6>
						<h6>{state ? state.followers.length : '0'} followers</h6>
						<h6>{state ? state.following.length : '0'} following</h6>
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
		</div >
	);
}

export default Profile;