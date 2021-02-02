import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../App';
import { Link } from 'react-router-dom';
const Home = () => {

	const [data, setData] = useState([]);
	const { state, dispatch } = useContext(UserContext);
	const like = null;

	useEffect(() => {
		fetch('/getsubpost', {
			headers: {
				'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			}
		})
			.then(res => res.json())
			.then(result => {
				setData(result.posts);
			})
	}, []);

	const likePost = (id) => {
		fetch('/like', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			},
			body: JSON.stringify({
				postId: id
			})
		}).then(res => res.json())
			.then(result => {
				const newData = data.map(item => {
					if (item._id == result._id) {
						return result;
					} else {
						return item;
					}
				})
				setData(newData);
			}).catch(err => {
				console.log(err);
			});
	};

	const unlikePost = (id) => {
		fetch('/unlike', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			},
			body: JSON.stringify({
				postId: id
			})
		}).then(res => res.json())
			.then(result => {
				const newData = data.map(item => {
					if (item._id == result._id) {
						return result;
					} else {
						return item;
					}
				})
				setData(newData);
			}).catch(err => {
				console.log(err);
			});
	};

	const makeComment = (text, postId) => {
		fetch('/comment', {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem('jwt')
			},
			body: JSON.stringify({
				postId,
				text
			})
		}).then(res => res.json())
			.then(result => {
				const newData = data.map(item => {
					if (item._id == result._id) {
						return result;
					} else {
						return item;
					}
				});
				setData(newData);
			}).catch(err => {
				console.log(err);
			});
	};

	const deletePost = (postId) => {
		fetch(`/deletepost/${postId}`, {
			method: 'delete',
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt')
			}
		})
			.then(res => res.json())
			.then(result => {
				const newData = data.filter(item => {
					return item._id !== result._id;
				})
				setData(newData)
			})
	}

	return (
		<div className='mainpaig'>
			{
				data.map(item => {
					return (
						<div className='mainpaig__home-card' key={item._id}>
							<div className='mainpaig__home-user'>
								<div>
									<Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}` : `/profile/`}><img className='mainpaig__home-user-img' src={item.postedBy.pic} /></Link>
									<h5 className='mainpaig__home-user-name'><Link to={item.postedBy._id !== state._id ? `/profile/${item.postedBy._id}` : `/profile/`}>{item.postedBy.name}</Link>
									</h5>
								</div>
								<div className='mainpaig__home-user-delete'>
									{item.postedBy._id === state._id &&
										<i className='material-icons' onClick={() => { deletePost(item._id) }}>clear</i>
									}
								</div>
							</div>
							<div className='mainpaig__home-img'>
								<img src={item.photo} className='mainpaig__home-img-img' />
							</div>
							<div className='card-content'>
								{item.likes.includes(state ? state._id : null)
									? <i className="material-icons" style={{ color: 'red', cursor: 'pointer' }} onClick={() => {
										return (state ? unlikePost(item._id) : null)
									}}>favorite</i>
									: <i className="material-icons" style={{ cursor: 'pointer' }} onClick={() => {
										return (state ? likePost(item._id) : null)
									}}>favorite</i>
								}
								<h6 className='mainpaig__home-likes' >{item.likes.length} отметок "Нравится"</h6>
								<h6 className='mainpaig__home-title' >Название поста: <span>{item.title}</span></h6>
								<p className='mainpaig__home-text' >Описание: <span>{item.body}</span></p>
								<div className='mainpaig__home-comments'>
									{
										item.comments.map(record => {
											return (
												<div className='mainpaig__home-comment'>
													<Link to={record.postedBy._id !== state._id ? `/profile/${record.postedBy._id}` : `/profile/`}><img src={record.postedBy.pic} /></Link>,
													<h6 key={record._id}>
														<Link to={record.postedBy._id !== state._id ? `/profile/${record.postedBy._id}` : `/profile/`}><span style={{ fontWeight: '500' }}>{record.postedBy.name}</span></Link>: {record.text}
													</h6>
												</div>
											)
										})
									}
								</div>
								<form onSubmit={(e) => {
									e.preventDefault();
									makeComment(e.target[0].value, item._id);
									e.target[0].value = '';
								}}>

									<input type='text' className='home-comment' placeholder='Добавить комментарий...' />
								</form>
							</div>

						</div>
					)
				})
			}
		</div >
	);
}

export default Home;