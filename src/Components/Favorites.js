import React, { Component } from 'react';
import Client from './Client';
import './css/Favorites.css';
import { isUndefined } from 'util';

class Favorites extends Component {
	state = {
		favLocations: ["London", "Moscow", "New York", "Kiev", "Cairo", "San Francisco", "Barcelona"],
		locations: [],
	};

	componentDidMount() {
		// var oldCachedFavorite = [{"title":"London","location_type":"City","woeid":44418,"latt_long":"51.506321,-0.12714"}];

		// this.addToFavorites(oldCachedFavorite);

		// this.handleSearchChange();
	};

	addToFavorites = (id, location) => {
		// const cachedFavorites = localStorage.getItem("favorites");

		// console.log("cachedFavorites: " + cachedFavorites);
		console.log("id: " + id);
		console.log("location: " + location);

		// if (cachedFavorites) {
		// 	cachedFavorites.concat(favorite);
		// 	localStorage.setItem("favorites", cachedFavorites);

		// 	console.log("!cachedFavorites was concats!\n\n" + JSON.stringify(cachedFavorites));		
		// } else {
		// 	localStorage.setItem("favorites", favorite);
		// }
		
		localStorage.setItem(id, location);

		console.log("localStorage.getItem(id): " + localStorage.getItem(id));
	};

	removeFavorite = favorite => {

	}

	handleSearchChange = e => {
		const value = (isUndefined(e)) ? "" : e.target.value;

		this.setState({
			locations: [],
			favLocations: []
		});

		var cachedFavorites = {
			"title": "title",
			"type": "type",
			"woeid": "woeid",
			"latt_long": "48.382881,31.173441"
		}

		cachedFavorites = localStorage.getItem("favorites");
		console.log("cachedFavorites above the IF: " + cachedFavorites[0].title);

		if (cachedFavorites) {
			this.setState({
				favLocations: cachedFavorites
			});
		}

		// TO REWRITE WITH LOCAL STORAGE //
		var newLocations = [];

		console.log("value: " + value);
		
		if (value === "") {
			for (var i = 0; i < cachedFavorites.length; i++) {
				newLocations.push(cachedFavorites[i]);

				console.log("cachedFavorites[i].title: " + cachedFavorites[i].title);
			};
		} else {
			for (var i = 0; i < cachedFavorites.length; i++) {
				if (~(cachedFavorites[i].title.toUpperCase()).indexOf(value.toUpperCase())) {
					newLocations.push(cachedFavorites[i]);

					console.log("cachedFavorites[i].title: " + cachedFavorites[i].title);
				}
			};
		}

		this.setState({
			locations: newLocations.slice(0, 25)
		});

		// this.state.favLocations.forEach(favLocation => {
		// 	if (~(favLocation.toUpperCase()).indexOf(value.toUpperCase())) {
		// 		Client.search("search/?query=" + favLocation, locations => {
		// 			this.setState({
		// 				locations: this.state.locations.concat(locations).slice(0, 25)
		// 			});

		// 			console.log("state.favLocation: " + favLocation);					
		// 		});
		// 	};
		// });

		// } else {
		// 	this.state.favLocations.forEach(favLocation => {
		// 		Client.search("search/?query=" + favLocation, locations => {
		// 			this.setState({
		// 				locations: this.state.locations.concat(locations).slice(0, 25)
		// 			});

		// 			console.log("state.favLocation: " + favLocation);						
		// 		});
		// 	});
		// };

		// UP TO HERE //
	};

	onLocationClick = location => {
		return 0;
	}

	render() {
		const locations = this.state.locations;

		const locationRows = locations.map((location, idx) => (
			// <tr key = {idx} onClick = {() => this.props.onLocationClick(location)}>			
			<tr key={idx}>
				<td>{location.title}</td>
				<td>{location.location_type}</td>
				<td>{location.woeid}</td>

				{console.log("location.title: " + location.title)}

				{/* Latitude & Longitude calculating (from location.latt_long string) */}

				<td>{(location.latt_long).substr(0, (location.latt_long).length - (location.latt_long).substr(
					(location.latt_long).indexOf(",")).length)}
				</td>
				<td>{(location.latt_long).substr(
					(location.latt_long).indexOf(",") + 1)}
				</td>
				<td><button>Remove from favorites</button></td>
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
