import React, { Component } from 'react';
import Client from './Client';
import './css/Search.css';

class Search extends Component {
	state = {
	  	locations: [],
	  	searchValue: ""
	};

	handleSearchChange = e => {
		const value = e.target.value;
	
		this.setState({
		  	searchValue: value
		});
	
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
				<td>Add to favorites</td>
			</tr>
		));

		return (
			<div className="Search">
				<div className="datagrid">
					<table>
						<thead>
							<tr>
								<th colSpan="6" className="Search">
									<input
										className="TextField"
										type="text"
										placeholder="Search location..."
										value={this.state.searchValue}
										onChange={this.handleSearchChange}
									/>
								</th>
							</tr>

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