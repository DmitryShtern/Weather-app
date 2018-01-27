import React, { Component } from 'react';
import Client from './Client';
import './css/Forecast.css';

class Forecast extends Component {
	state = {
		woeid: "",
		forecast: []
 	};

	handleSearchChange = e => {
		// const id = e.target.value;
	
		// this.setState({
		// 	searchValue: value
		// });
	
		// if (value === "") {
		// 	this.setState({
		// 		forecast: []
		// 	});
		// } else {
			// this.state.locNames.forEach(locName => {
			// 	if (~locName.indexOf(value)) {
					
			// 	};
			// });
		// }

		Client.search(this.state.woeid, forecast => {	// SWAP this.state.woeid TO LOCAL id
			this.setState({
				forecast: forecast.slice(0, 25)
			});
		});
	};

	render() {
		const forecast = this.state.forecast;
	
		const locationRows = forecast.map((dailyForecast, idx) => (
			<tr key = {idx}>
				<td>Title</td>
				<td>Today</td>
				<td>Tommorow</td>
				<td>+2</td>
				<td>+3</td>
				<td>+4</td>
				<td>+5</td>
			</tr>
		));

		return (
			<div className="Forecast">
				<div className="datagrid">
					<table>
						<thead>
							<tr>
								<th>1</th>
								<th>2</th>
								<th>3</th>
								<th>4</th>
								<th>5</th>
								<th>6</th>
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

export default Forecast;