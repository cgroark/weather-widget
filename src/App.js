import React, { Component } from 'react';
import './App.css';
import WeatherSearch from './WeatherSearch.js';
require('dotenv').config();

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
        </p>
        <WeatherSearch />
      </div>
    );
  }
}

export default App;
