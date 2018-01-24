import React, { Component } from 'react';
//import logo from './logo.svg';
import './NavigationBar.css';

class NavigationBar extends Component {
  render() {
    return (
        <header className="NavigationBar">
            <img src={"https://www.metaweather.com/static/img/weather/c.svg"} className="Logo" alt="MetaWeather API" />
            <h1 className="Title">Welcome to MetaWeather API web-site</h1>
            <button className="MenuButton" onclick="myFunction()">Search</button>
            <button className="MenuButton" onclick="myFunction()">Favorites</button>
        </header>
    );
  }
}

export default NavigationBar;
