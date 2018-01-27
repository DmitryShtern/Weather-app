import React, { Component } from 'react';
// import NavigationBar from './Components/NavigationBar';
import Search from './Components/Search';
import Favorites from './Components/Favorites';
import Forecast from './Components/Forecast';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			location: "",
			content: <Search />
		};
	};

	// changeLocation = (evt) => {
	// 	this.setState({
	// 		location: evt.target.value
	// 	});
	// };
	
	render() {
		return (
			<div className="App">
				{/* <NavigationBar /> */}

				<header>
					<a href="https://www.metaweather.com/"><img src={"https://www.metaweather.com/static/img/weather/c.svg"} className="Logo" alt="MetaWeather API" /></a>
					<h1 className="Title"><a href="https://www.metaweather.com/">Welcome to MetaWeather API web-site</a></h1>
					<button className="MenuButton">Search</button>
					<button className="MenuButton">Favorites</button>
					{/* onClick={this.toSearch()} */}
				</header>

				{this.state.content}
			</div>
		);
	}
}

export default App;
