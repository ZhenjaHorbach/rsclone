import React from 'react';
import { Link } from 'react-router-dom';

const NewPost = () => {
	return (
		<div className='card input-filed' style={{ margin: '10px auto', maxWidth: '500px', textAlign: 'center', padding: '30px' }}>
			<input type='text' placeholder='title' />
			<input type='text' placeholder='body' />
			<div className="file-field input-field">
				<div className="btn">
					<span>Upload Image</span>
					<input type="file" multiple />
				</div>
				<div className="file-path-wrapper">
					<input className="file-path validate" type="text" placeholder="Upload one or more files" />
				</div>
			</div>
			<button className="btn waves-effect waves-light blue lighten-2">
				Submit post
				</button>

		</div>
	);
}

export default NewPost;