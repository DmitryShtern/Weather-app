import React, { Component } from 'react';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import Search from './Components/Search';

class App extends Component {
	constructor() {
		super();
		this.state = {
			isSearchPage: true,
			locations: []
		};
	}

	

	render() {
		return (
			<div className="App">
				<NavigationBar />

				<input className="SearchField" name="search_field" type="search" placeholder="Location name" list="location_names"/>
					<div>
						{/* <h1>this.state.title</h1>
						<h1>this.state.type</h1>
						<h1>this.state.woeid</h1> */}
					</div>
				<h1>{(this.state.isSearchPage) ? "true" : "false"}</h1>
			</div>
		);
	}
}

export default App;