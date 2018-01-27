import React, { Component } from 'react';
import Client from './Client';
import './css/Search.css';
import Favorites from './Favorites';

<Favorites ref="favorites"/>

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
		  	Client.search("search/?query=" + value, locations => {
				this.setState({
					locations: locations.slice(0, 25)
				});
			});
		}
	};

	render() {
		const locations = this.state.locations;
	
		const locationRows = locations.map((location, idx) => (
			// <tr key = {idx} onClick = {() => this.props.onLocationClick(location)}>
			<tr key = {idx}>
				<td>{location.title}</td>
				<td>{location.location_type}</td>
				<td>{location.woeid}</td>

				{/* Latitude & Longitude calculating (from location.latt_long string) */}

				<td>{
					(location.latt_long).substr(0, (location.latt_long).length - (location.latt_long).substr(
					(location.latt_long).indexOf(",")).length)
				}</td>
				<td>{(location.latt_long).substr(
					(location.latt_long).indexOf(",") + 1)}
				</td>
				<td><button>Add to favorites</button></td>
				{/* <Favorites addToFavorites={location.woeid}/> */}
			</tr>
		));

		console.log("locationRows: " + (locationRows));

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
								<th>Location</th>
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
	}
}

export default Search;
