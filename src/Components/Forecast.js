import React, { Component } from 'react';
import Client from './Client';
import './css/Forecast.css';

import forecastJSON from '../forecast.json';

class Forecast extends Component {
	constructor() {
		super();
		this.state = {
			forecast: forecastJSON,
			woeid: sessionStorage.getItem("woeid")
		};
	};

	componentWillMount() {
		this.handleForecastRequest();
	};

	handleForecastRequest() {
		const id = this.state.woeid;

		Client.search(id + "/", cast => {
			this.setState({
				forecast: cast
			});
		});
	};

	addToFavorites = (title, forecast) => {
		let location = (
			'{"title":"' + forecast.title +
			'","location_type":"' + forecast.location_type +
			'","woeid":' + forecast.woeid +
			',"latt_long":"' + forecast.latt_long + '"}'
		);
		
		localStorage.setItem(title, location); //JSON.stringify(location));
		
		console.log("addToFavorites(" + title + ", forecast)");
		console.log("location: " + location);
		console.log("location: " + JSON.stringify(location));
	};

	render() {
		const forecast = this.state.forecast;

		console.log("forecast.title: " + JSON.stringify(forecast.title));
		console.log("forecast.consolidated_weather: " + JSON.stringify(forecast.consolidated_weather));

		const forecastInfo = (
			<div className="Forecast-Info">
				<h1 className="Forecast-Title">{forecast.title}</h1>
				<h3 className="Parent-Title">{forecast.parent.title}</h3>

				<dl>
					<dt>Time: {forecast.time.substr(11, 5)}</dt>
					<dt>Sunrise: {forecast.sun_rise.substr(11, 5)}</dt>
					<dt>Senset: {forecast.sun_set.substr(11, 5)}</dt>
				</dl>
				
				<button
						className="To-Favorites-Info"
						onClick={() => {
							this.addToFavorites(forecast.title, forecast)
						}}>
						Add to favorites
				</button>
			</div>
		);

		// MB THIS (const forecastList) SHOULD BE OUT OF render()? //

		const forecastList = forecast.consolidated_weather.map((dailyForecast, idx) => (
			<div className="Daily-Forecast" key={idx}>
				<h3 className="Day">{
					dailyForecast.applicable_date.slice(-2)
					+ "." +
					dailyForecast.applicable_date.slice(-5, -3)}
				</h3>

		 		<dl>
		 			<dt className="Hidden">Weather</dt>
		 			<dd>{dailyForecast.weather_state_name}</dd>					
		 			<dd className="Weather-State">
		 				<img
							className="Image-Daily-Forecast"
							src={"https://www.metaweather.com/static/img/weather/" + dailyForecast.weather_state_abbr + ".svg"}
							alt={"Weather: " + dailyForecast.weather_state_name}
						/>
					</dd>

					<dt className="Hidden">Temperature</dt>
					<dd>Min: {~~dailyForecast.min_temp} C°<br />Max: {~~dailyForecast.max_temp} C°</dd>

					<dt><b>Wind:</b> {dailyForecast.wind_direction_compass}</dt>
					<dd>
						{/* <img
							// style={{
							// 	transform: rotate + "(" + ~~dailyForecast.wind_direction + 'deg)'
							// }}
							className="Image-Wind-Arrow"
							src={"https://www.metaweather.com/static/img/windarrow.svg" + dailyForecast.weather_state_abbr + ".svg"}
							alt={"Wind: " + dailyForecast.wind_direction_compass}
						/> */}
						{~~dailyForecast.wind_speed}mph
					</dd>

					<dd><b>Humidity:</b> {dailyForecast.humidity}%</dd>

					<dd><b>Pressure:</b> {~~dailyForecast.air_pressure}mb</dd>

					<dd><b>Confidence:</b> {dailyForecast.predictability}%</dd>
				</dl>
			</div>
		));

		sessionStorage.setItem("weather-abbr", forecast.consolidated_weather[0].weather_state_abbr);

		return (
			<div className="Forecast">
				{forecastInfo}
				{forecastList}
			</div>
		);
	};
};

export default Forecast;
