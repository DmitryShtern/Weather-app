import React, { Component } from 'react';
import Client from './Client';
import './css/Favorites.css';
import { isUndefined } from 'util';

class Favorites extends Component {
	state = {
		locNames: ["London", "Moscow", "New York", "Kiev", "Cairo", "San Francisco", "Barcelona"],
		locations: [],
		searchValue: ""
 	};

	componentDidMount() {
		this.handleSearchChange();
	};


	handleSearchChange = e => {
		const value = (isUndefined(e)) ? "" : e.target.value;
	
		this.setState({
			searchValue: value,
			locations: []
		});

		// TO REWRITE WITH LOCAL STORAGE //
	
		if (value !== "") {
			this.state.locNames.forEach(locName => {
				if (~(locName.toUpperCase()).indexOf(value.toUpperCase())) {
					Client.search("search/?query=" + locName, locations => {
						this.setState({
							locations: this.state.locations.concat(locations).slice(0, 25)
						});

						console.log("state.locations: " + locName);
						console.log("state.searchValue: " + this.state.searchValue);						
					});
				};
			});
		} else {
			this.state.locNames.forEach(locName => {
				Client.search("search/?query=" + locName, locations => {
					this.setState({
						locations: this.state.locations.concat(locations).slice(0, 25)
					});

					console.log("state.locations: " + locName);
					console.log("state.searchValue: " + this.state.searchValue);						
				});
			});
		};

		// UP TO HERE //
	};

	onLocationClick = location => {
		return 0;
	}

	render() {
		const locations = this.state.locations;
	
		const locationRows = locations.map((location, idx) => (
			
			<tr key = {idx}>
			{/* <tr key = {idx} onClick = {() => this.props.onLocationClick(location)}> */}
				<td>{location.title}</td>
				<td>{location.location_type}</td>
				<td>{location.woeid}</td>

				{/* Latitude & Longitude calculating (from location.latt_long string) */}

				<td>{(location.latt_long).substr(0, (location.latt_long).length - (location.latt_long).substr(
					(location.latt_long).indexOf(",")).length)}
				</td>
				<td>{(location.latt_long).substr(
					(location.latt_long).indexOf(",") + 1)}
				</td>
				<td><button>Add to favorites</button></td>
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
						</thead>
					</table>

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

export default Favorites;





// export default function SelectedLocations(props) {
//   const { locations } = props;

//   const locationRows = locations.map((location, idx) => (
//     <tr key = {idx} onClick = {() => props.onLocationClick(idx)}>
//       <td>{location.title}</td>
//       <td className = "right aligned">{location.location_type}</td>
//       <td className = "right aligned">{location.woeid}</td>
      
//       {/* Latitude & Longitude calculating (from location.latt_long string) */}

//       <td className = "right aligned">{
//         (location.latt_long).substr(0, (location.latt_long).length - (location.latt_long).substr(
//           (location.latt_long).indexOf(",")).length)
//       }</td>
//       <td className = "right aligned">{(location.latt_long).substr(
//         (location.latt_long).indexOf(",") + 1)}
//       </td>
//     </tr>
//   ));

// 	return (
// 		<table className = "ui selectable structured large table">
// 			<thead>
// 				<tr>
// 					<th colSpan = "5">
// 					<h3>Favorites locations</h3>
// 					</th>
// 				</tr>

// 				<tr>
// 					<th className = "eight wide">Location</th>
// 					<th>Type</th>
// 					<th>Woeid</th>
// 					<th>Latitude</th>
// 					<th>Longitude</th>
// 				</tr>
// 			</thead>
// 			<tbody>
// 				{locationRows}
// 			</tbody>
// 		</table>
// 	);
// }