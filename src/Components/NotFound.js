import React, { Component } from 'react';
import './css/NotFound.css';

class NotFound extends Component {
	constructor() {
		super();
		this.state = {};
	};
	
	render() {
		return (
			<div className="NotFound">
				<h1 className="Label">404 - Page not found!</h1>
				<h4>Oups, we can't find that page. Sorry.</h4>
			</div>
		);
	};
};

export default NotFound;
