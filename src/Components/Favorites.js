import React, { Component } from 'react';
import { isUndefined } from 'util';
import './css/Favorites.css';

class Favorites extends Component {
	constructor() {
		super();
		this.state = {
			locations: Object.values(localStorage),

			favorites: Object.values(localStorage)
		};
	};

	componentDidMount() {
		// this.handleSearchChange();

		// test settings up local storage

		{/*
		console.log("123");

		Object.values(localStorage).forEach(value => {
			console.log("JSON.parse(value)).title: \n" + (value).title); // JSON.parse(value).title);
		});

		Object.values(localStorage).map(value => {
			console.log("JSON.parse(value)).title: \n" + (value).title); // JSON.parse(value).title);
		});

		console.log("Object.values(localStorage): \n" + JSON.stringify(Object.values(localStorage))); // Object.values(localStorage));
		console.log("this.state.locations: \n" + (this.state.locations));
		*/}
	};

	removeFavorite = favorite => {
		//
	};

	handleSearchChange = e => {
		const value = (isUndefined(e)) ? "" : e.target.value;

		this.setState({
			locations: []
		});

		console.log("value: " + value);

		if (value === "") {
			this.setState({
				locations: this.state.favorites
			});
		} else {
			let newLocations = [];

			this.state.favorites.forEach(favorite => {
				let title = JSON.parse(favorite).title.toLowerCase();

				if (~title.indexOf(value.toLowerCase())) {	// substring searching

				console.log("1) favorite.title: " + JSON.parse(favorite).title);
				newLocations.push(favorite);					
				}

				console.log("2) favorite.title: " + JSON.parse(favorite).title);
			});

			this.setState({
				locations: newLocations
			});
		};
		
		// if (value === "") {
		// 	for (let i = 0; i < cachedFavorites.length; i++) {
		// 		newLocations.push(cachedFavorites[i]);

		// 		console.log("cachedFavorites[i].title: " + cachedFavorites[i].title);
		// 	};
		// } else {
		// 	for (let i = 0; i < cachedFavorites.length; i++) {
		// 		if (~(cachedFavorites[i].title.toUpperCase()).indexOf(value.toUpperCase())) {
		// 			newLocations.push(cachedFavorites[i]);

		// 			console.log("cachedFavorites[i].title: " + cachedFavorites[i].title);
		// 		}
		// 	};
		// }

		// this.setState({
		// 	locations: newLocations.slice(0, 25)
		// });
	};

	onLocationClick = location => {
		return 0;
	};

	render() {

		// // const locations = JSON.stringify();
		// const values = JSON.parse(Object.values(localStorage));
		// // values.value = JSON.parse(values.value);

		// console.log("values: " + values);

		// Object.values(localStorage).map(value => {
		// 	console.log("JSON.parse(value)).title: \n" + JSON.parse(value).title); // JSON.parse(value).title);
		// });

		// console.log("Object.values(localStorage): \n" + (Object.values(localStorage))); // Object.values(localStorage));



		// Бл$дский АПИ не даёт распарсить весь локал сторейдж, так как latt_long содержит запятую (12.345678,-9.012345)
		// Так что паршу каждое значение при использовании
		// Да это жестко

		const locationRows = (this.state.locations).map((value, idx) => (
			// <tr key = {idx} onClick = {() => this.props.onLocationClick(location)}>

			<tr key={idx}>
				<td>{JSON.parse(value).title}</td>
				<td>{JSON.parse(value).location_type}</td>
				<td>{JSON.parse(value).woeid}</td>

				{/* Latitude & Longitude calculating (from location.latt_long string) */}

				{/*
				{console.log("JSON.parse(value).title: " + JSON.parse(value).title)}
				{console.log("JSON.parse(value).location_type: " + JSON.parse(value).location_type)}
				{console.log("JSON.parse(value).woeid: " + JSON.parse(value).woeid)}
				{console.log("JSON.parse(value).latt_long: " + JSON.parse(value).latt_long)}
				*/}

				<td>{(JSON.parse(value).latt_long).substr(0, (JSON.parse(value).latt_long).length - (JSON.parse(value).latt_long).substr(
					(JSON.parse(value).latt_long).indexOf(",")).length)}
				</td>
				<td>{(JSON.parse(value).latt_long).substr(
					(JSON.parse(value).latt_long).indexOf(",") + 1)}
				</td>
				<td><button className="From-Favorites">Remove from favorites</button></td>
			</tr>
		));

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
										placeholder="Search favorite..."
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
	};
};

export default Favorites;
