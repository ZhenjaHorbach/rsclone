import React from 'react';
import '../App.css';

const Footer = () => {
	return (
		<div className="footerBody">
			<a href="https://github.com/ZhenjaHorbach" target="_blank" className="footerBodyGit"><p>GitHub</p></a>
			<p className="footerBodyYearName">2021 © Instagram clone</p>
			<a href="https://rs.school/js/" target="_blank" className="footerBodyImg">
				<img src="https://rs.school/images/rs_school_js.svg" />
			</a>
		</div>
	);
}

export default Footer;