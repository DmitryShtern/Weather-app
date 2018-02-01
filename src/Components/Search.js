import React, { Component } from 'react';
import Client from './Client';
import './css/Search.css';

class Search extends Component {
	state = {
		locations: []
	};

	handleSearchChange = e => {
		const value = e.target.value;
	
		if (value === "") {
			this.setState({
				locations: []
			});
		} else {
				// TODO: you can continue promise chain right here without need to pass
				// TODO: callback to Client component
		  	Client.search("search/?query=" + value, locations => {
				this.setState({
					locations: locations.slice(0, 25)
				});
			});
		}
	};

	addToFavorites = (title, location) => {
		// TODO: remove console.logs after debugging
		console.log("title: " + title);
		console.log("location: " + (location));
		
		localStorage.setItem(title, location); //JSON.stringify(location));
	};

	clickLocation = id => {
		sessionStorage.setItem("woeid", id);

		this.props.chooseLocation("forecast");
	};

	render() {
		const locations = this.state.locations;
	
		const locationRows = locations.map((location, idx) => (
			<tr key = {idx}>
				<td onClick = {() => {(this.clickLocation(location.woeid))}}>
					<a className="Location-Title">{location.title}</a>
				</td>
				{/* TODO: map data gained from network to use consistent camelCase names */}
				<td>{location.location_type}</td>
				<td>{location.woeid}</td>

				{/* Latitude & Longitude calculating (from location.latt_long string) */}

				<td>{(location.latt_long).substr(0, (location.latt_long).length - (location.latt_long).substr(
					(location.latt_long).indexOf(",")).length)}
				</td>
				<td>{(location.latt_long).substr(
					(location.latt_long).indexOf(",") + 1)}
				</td>
				<td>
					<button
						className="To-Favorites"
						onClick={() => {
							this.addToFavorites(location.title, JSON.stringify(location))
						}}>
						Add to favorites
					</button>
				</td>
			</tr>
		));
		
		sessionStorage.setItem("weather-abbr", "none");

		return (
			<div className="Search">
				<div className="Search-Row">
					<table>
						<thead>
							<tr>
								<th className="Search">
									<input
										className="TextField"
										type="text"
										placeholder="Search location..."
										onChange={this.handleSearchChange}
									/>
								</th>
							</tr>
						</thead>
					</table>
				</div>

				<div className="Location-Grid">
					<table>
						<thead>
							<tr>
								<th>Location (clickable)</th>
								<th>Type</th>
								<th>Woeid</th>
								<th>Latitude</th>
								<th>Longitude</th>
								<th>To favorites</th>
							</tr>
						</thead>

						<tbody>
							{locationRows}
						</tbody>
					</table>
				</div>
			</div>
		);
	};
};

export default Search;
