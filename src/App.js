import React, { Component } from 'react';
// import NavigationBar from './Components/NavigationBar';
import Search from './Components/Search';
import Favorites from './Components/Favorites';
import Forecast from './Components/Forecast';
import NotFound from './Components/NotFound';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			content: <Search />
		};
	};

	componentDidMount() {
		let to = sessionStorage.getItem("content");

		to = (to !== null) ? to : "search";
		this.changeContent(to);

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
		sessionStorage.setItem("content", to);

		switch (to) {
			case "search": this.setState({content: <Search />});
				break;
			case "favorites": this.setState({content: <Favorites />});
				break;
			case "forecast": this.setState({content: <Forecast />});
				break;
			default: this.setState({content: <NotFound />});
				break;
		}
	};

	toForecast() {

	};
	
	render() {
		return (
			<div className="App">
				{/* <NavigationBar /> */}

				<header>
					<a href="https://www.metaweather.com/">
						<img src={"https://www.metaweather.com/static/img/weather/c.svg"} className="Logo" alt="MetaWeather API" />
					</a>

					<h1 className="Title">
						<a href="https://www.metaweather.com/">Welcome to MetaWeather API web-site</a>
					</h1>

					<button className="Menu-Button" onClick={() => {this.changeContent("search")}}>Search</button>
					<button className="Menu-Button" onClick={() => {this.changeContent("favorites")}}>Favorites</button>
					{/* onClick={this.toSearch()} */}
				</header>

				{this.state.content}
			</div>
		);
	};
};

export default App;
