import React, {Component} from 'react';
import Results from './Results';
import FaSearch from 'react-icons/lib/fa/search';
let key = process.env.REACT_APP_API;

class WeatherSearch extends Component {
	constructor(props){
		super(props)
		this.state = {
			city: '',
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
			city: '',
		})
	}

	handleChange = (e) => {
		this.setState({
			city: e.target.value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + ',US&APPID=' + key;
		let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.state.city + ',US&APPID=' + key;
		fetch(weatherUrl)
			.then(response => {
				return response.json()
			})
			.then(json => {
				this.setState({
					weather: json,
					search: 'yes'
				})
				console.log('weatherasdasd', this.state.forecast, this.state.search, this.state.forecast.cnt)
			})

		fetch(forecastUrl)
			.then(response => {
				return response.json()
			})
			.then(json => {
				this.setState({
					forecast: json
				})
			console.log('aforecast', this.state.forecast, this.state.search, this.state.forecast.cnt)
			})
	}


	render() {
		let weather = this.state.weather;
		let forecast = this.state.forecast;
		let search = this.state.search;		
		return(
			<div className='weather-div'>
				<form type='input'  onSubmit={this.handleSubmit}>
					<button type='submit' id='mag-icon'><FaSearch /></button>
					<input placeholder='City, State' value={this.state.city} onChange={this.handleChange}></input>
					
				</form>
				{forecast && 
					<button id='delete' onClick={this.handleDelete}>X</button>
					}
				<hr></hr>
				{search && weather.cod === '404' &&
					<h3>No matching city found</h3>
				}
				{forecast.cnt > 0 &&
				<Results data={this.state.weather} city={this.state.city} forecast={this.state.forecast}/>
				}
			</div>
			)
	}
}

export default WeatherSearch;