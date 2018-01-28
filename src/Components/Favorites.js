import React, { Component } from 'react';
import { isUndefined } from 'util';
import './css/Favorites.css';

class Favorites extends Component {
	constructor() {
		super();
		this.state = {
			locations: Object.values(localStorage),
			search: ""
		};
	};

	// componentDidMount() {
	// 	// this.handleSearchChange();

	// 	// test settings up local storage

	// 	{/*
	// 	console.log("123");

	// 	Object.values(localStorage).forEach(value => {
	// 		console.log("JSON.parse(value)).title: \n" + (value).title); // JSON.parse(value).title);
	// 	});

	// 	Object.values(localStorage).map(value => {
	// 		console.log("JSON.parse(value)).title: \n" + (value).title); // JSON.parse(value).title);
	// 	});

	// 	console.log("Object.values(localStorage): \n" + JSON.stringify(Object.values(localStorage))); // Object.values(localStorage));
	// 	console.log("this.state.locations: \n" + (this.state.locations));
	// 	*/}
	// };

	handleSearchChange = e => {
		const value = (isUndefined(e)) ? this.state.search : e.target.value;

		this.setState({
			locations: Object.values(localStorage),
			search: value
		});

		console.log("value: " + value);

		if (value !== "") {
			let newLocations = [];

			Object.values(localStorage).forEach(favorite => {
				let title = JSON.parse(favorite).title.toLowerCase();

				if (~title.indexOf(value.toLowerCase())) {	// substring searching
				newLocations.push(favorite);					
				}
			});

			this.setState({
				locations: newLocations
			});
		};
	};

	clickLocation = id => {
		sessionStorage.setItem("woeid", id);

		this.props.chooseLocation("forecast");
	};
	
	removeFavorite = title => {
		localStorage.removeItem(title);

		console.log("removeFavorite() ->");

		this.handleSearchChange();
	};

	locRowsMap() {
		const locRows = (this.state.locations).map((location, idx) => (
			<tr key={idx}>
				<td onClick = {() => {(this.clickLocation(JSON.parse(location).woeid))}}>
					<a className="Location-Title">{JSON.parse(location).title}</a>
				</td>

				<td>{JSON.parse(location).location_type}</td>
				<td>{JSON.parse(location).woeid}</td>

				{/* LATITUDE & LONGITUDE calculating (from location.latt_long string) */}

				{console.log("JSON.parse(location).title: " + JSON.parse(location).title)}
				{console.log("JSON.parse(location).location_type: " + JSON.parse(location).location_type)}
				{console.log("JSON.parse(location).woeid: " + JSON.parse(location).woeid)}
				{console.log("JSON.parse(location).latt_long: " + JSON.parse(location).latt_long)}
				{console.log("idx: " + idx)}
				

				<td>{(JSON.parse(location).latt_long).substr(0, (JSON.parse(location).latt_long).length - (JSON.parse(location).latt_long).substr(
					(JSON.parse(location).latt_long).indexOf(",")).length)}
				</td>
				<td>{(JSON.parse(location).latt_long).substr(
					(JSON.parse(location).latt_long).indexOf(",") + 1)}
				</td>
				<td>
					<button
						className="From-Favorites"
						onClick={() => {
							this.removeFavorite(JSON.parse(location).title);
						}}>
						Remove from favorites
					</button>
				</td>
			</tr>
		));

		return locRows;
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



			// АПИ не даёт распарсить весь локал сторейдж, так как latt_long содержит запятую (12.345678,-9.012345)
			// Так что паршу каждое значение при использовании
			// Да это жестко

		const locationRows = this.locRowsMap();

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

export default Favorites;
