import React, { Component } from 'react';
// TODO: remove unneeded commented code
// import NavigationBar from './Components/NavigationBar';
// TODO: name folders in lowercase
// TODO: use module pattern (with index.js) for organizing your folders and 
// TODO: import components like import { Search } from './components'
import Search from './Components/Search';
import Favorites from './Components/Favorites';
import Forecast from './Components/Forecast';
import NotFound from './Components/NotFound';
import './App.css';

// TODO: use 2 spaces instead tabs for indentation
class App extends Component {
	constructor() {
		super();
		this.state = {
			content: <Search />
		};

		this.toForecast.bind(this);
	};

	toForecast() {
		this.changeContent("forecast");
	}

	componentWillMount() {
		let to = sessionStorage.getItem("content");

		to = (to !== null) ? to : "search";
		this.changeContent(to);
		// TODO: remove unneeded commented code
		//	^	IF 'content' in sessionStorage === null
		//	^	this.state.content = <Search />

		//
		// if (sessionStorage.getItem("content") !== null)
		// 	this.changeContent(sessionStorage.getItem("content"));
		// else
		// 	this.changeContent("search");
		//
	};

	changeContent = to => {
		// TODO: use libs like react-router for navigation between pages & saving 
		// TODO: current route after refreshing
		sessionStorage.setItem("content", to);

		switch (to) {
			case "search": this.setState({content: <Search chooseLocation={this.changeContent}/>});
				break;
			case "favorites": this.setState({content: <Favorites chooseLocation={this.changeContent}/>});
				break;
			case "forecast": this.setState({content: <Forecast />});
				break;
			default: this.setState({content: <NotFound />});
				break;
		}
	};
	
	render() {
		return (
			<div className="App">
				<header>
					<div className="Header-Panel">
						<a href="https://www.metaweather.com/">
							<img src={"https://www.metaweather.com/static/img/weather/c.svg"} className="Logo" alt="MetaWeather API" />
						</a>

						<h1 className="Title">
							<a href="https://www.metaweather.com/">Welcome to MetaWeather API web-site</a>
						</h1>

						<button className="Menu-Button" onClick={() => {this.changeContent("search")}}>Search</button>
						<button className="Menu-Button" onClick={() => {this.changeContent("favorites")}}>Favorites</button>
					</div>
				</header>

				{this.state.content}
			</div>
		);
	};
};

export default App;
