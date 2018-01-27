import React, { Component } from 'react';
//import logo from './logo.svg';
import './css/NavigationBar.css';

class NavigationBar extends Component {
	myFunction() {
		console.log("Button was pressed");
	};

	render() {
		return (
			<header className="NavigationBar">
					<img src={"https://www.metaweather.com/static/img/weather/c.svg"} className="Logo" alt="MetaWeather API" />
					<h1 className="Title">Welcome to MetaWeather API web-site</h1>
					<button className="MenuButton" onClick={this.myFunction()}>Search</button>
					<button className="MenuButton" onClick={this.myFunction()}>Favorites</button>
			</header>
		);
	}
}

export default NavigationBar;
