import React from 'react';

const Profile = () => {
	return (
		<div>
			<div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px 0 ', borderBottom: '1px solid black' }}>
				<div>
					<img style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'red' }} />
				</div>
				<div>

					<h4>Test Name</h4>
					<div style={{ display: 'flex', justifyContent: 'space-between', width: '110%' }}>
						<h6>0 followers</h6>
						<h6>0 following</h6>
						<h6>0 posts</h6>
					</div>
				</div>
			</div>
			<div className='gallery'>
				<img className='gallery__item' />
				<img className='gallery__item' />
				<img className='gallery__item' />
				<img className='gallery__item' />
				<img className='gallery__item' />
				<img className='gallery__item' />
			</div>
		</div>
	);
}

export default Profile;