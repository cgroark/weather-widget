import React, {Component} from 'react';
import Results from './Results';
import FaSearch from 'react-icons/lib/fa/search';
let key = process.env.REACT_APP_API;

class WeatherSearch extends Component {
	constructor(props){
		super(props)
		this.state = {
			city: '',
			weather: null,
			forecast: null,
			search: null
		}
	}

	handleDelete = (e) => {
		e.preventDefault()
		this.setState({
			forecast: null,
			city: ''
		})
		console.log('delete', this.state.city)
	}

	handleChange = (e) => {
		this.setState({
			city: e.target.value
		})
	}

	handleSubmit = (e) => {
		console.log('key', key)
		e.preventDefault();
		let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + ',US&APPID=' + key;
		let forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + this.state.city + ',US&APPID=' + key;
		fetch(weatherUrl)
			.then(response => {
				return response.json()
			})
			.then(json => {
				console.log('url', weatherUrl)
				this.setState({
					weather: json,
					search: 'yes'
				})
				console.log('state', this.state.weather)
			})
		fetch(forecastUrl)
			.then(response => {
				return response.json()
			})
			.then(json => {
				console.log('forecast', forecastUrl)
				this.setState({
					forecast: json,
				})
				console.log('state forecast', this.state.forecast)
			})
	}


	render() {
		let forecast = this.state.forecast;
		let search = this.state.search;
		return(
			<div className='weather-div'>
				<form type='input'  onSubmit={this.handleSubmit}>
					<button type='submit' id='mag-icon'><FaSearch /></button>
					<input placeholder='City, State' onChange={this.handleChange}></input>
					
				</form>
				{forecast && 
					<button id='delete' onClick={this.handleDelete}>X</button>
					}
				<hr></hr>
				{forecast && 
				<Results data={this.state.weather} city={this.state.city} forecast={this.state.forecast}/>
				}
			</div>
			)
	}
}

export default WeatherSearch;