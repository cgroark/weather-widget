import React, {Component} from 'react';
import Results from './Results';
let key = process.env.REACT_APP_API;

class WeatherSearch extends Component {
	constructor(props){
		super(props)
		this.state = {
			city: '',
			weather: null,
			forecast: null
		}
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
					weather: json
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
					forecast: json
				})
				console.log('state forecast', this.state.forecast)
			})
	}


	render() {
		let forecast = this.state.forecast;
		return(
			<div className='weather-div'>
				<form type='input'  onSubmit={this.handleSubmit}>
					<input placeholder='enter City and State' onChange={this.handleChange}></input>
				</form>
				<hr></hr>
				{forecast &&
				<Results data={this.state.weather} city={this.state.city} forecast={this.state.forecast}/>
				}
			</div>
			)
	}
}

export default WeatherSearch;