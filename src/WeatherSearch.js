import React, {Component} from 'react';
import Results from './Results';
import FaSearch from 'react-icons/lib/fa/search';
let key = process.env.REACT_APP_API;

class WeatherSearch extends Component {
	constructor(props){
		super(props)
		this.state = {
			zip: '',
			weather: {},
			forecast: {},
			search: ''
		}
	}

	handleDelete = (e) => {
		e.preventDefault()
		this.setState({
			weather: {},
			forecast: {},
			zip: '',
		})
	}

	handleChange = (e) => {
		this.setState({
			zip: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=' + this.state.zip + ',US&APPID=' + key;
		let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?zip=' + this.state.zip + ',US&APPID='  + key;
		fetch(weatherUrl)
			.then(response => {
				return response.json()
			})
			.then(json => {
				this.setState({
					weather: json,
					search: 'yes'
				})
			})
		fetch(forecastUrl)
			.then(response => {
				return response.json()
			})
			.then(json => {
				this.setState({
					forecast: json
				})
			})
	}
	render() {
		const {weather, forecast, search, zip} = this.state;	
		return(
			<div className='weather-div'>
				<form type='input'  onSubmit={this.handleSubmit}>
					<button type='submit' id='mag-icon'><FaSearch /></button>
					<input placeholder='Enter your zip code' value={this.state.zip} onChange={this.handleChange}></input>
					
				</form>
				{forecast && zip.length > 0 &&
					<button id='delete' onClick={this.handleDelete}>x</button>
				}
				{search && weather.cod === '404' &&
					<h3>No matching zip found</h3>
				}
				{forecast.cnt > 0 &&
				<Results data={this.state.weather} zip={this.state.zip} forecast={this.state.forecast}/>
				}
			</div>
			)
	}
}

export default WeatherSearch;