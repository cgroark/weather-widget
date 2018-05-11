import React, {Component} from 'react';

class Forecast extends Component {
	render(){
		let fahrenheitHigh = Math.round(this.props.max * (9/5) -459.67);
		let fahrenheitLow = Math.round(this.props.min * (9/5) -459.67);
		console.log('string date', this.props.dt)

		let date = this.props.dt.split('').slice(5,10).join('')
		console.log('part date', date)
		return(
			<div className='forecast-each'>
				<h1 className='forecast-date'>{date}</h1>
				<p className='forecast-high'>{fahrenheitHigh}<sup> o </sup> F</p>
				<p className='forecast-low'>{fahrenheitLow}<sup> o </sup> F</p>
			</div>
		)
	}
}	
		
class Results extends Component{
	render(){
		let current = this.props.data
		const fiveDay = this.props.forecast.list.filter(item => {
    		return item.dt_txt[12] === '2' || item.dt_txt[11] === '2';
  		})
  		console.log(fiveDay, 'fiveday')
		const forecast = fiveDay.map(each => {
			return <Forecast dt={each.dt_txt} min={each.main.temp_min} max={each.main.temp_max} />
		})
		let currentF = Math.round(current.main.temp * (9/5) -459.67);
		return(
			<div>
				<div className='current-weather'>
					<span id='current-temp'>{currentF}</span><span id="temp-f"><sup>o </sup>F</span>
					<p id='current-desc'>{current.weather[0].description}</p>
					<p id='humidity'>{current.main.humidity}% Humidity</p>
				</div>
				<div className='forecast'>
					{forecast}
				</div>

			</div>
			)
	}
}

export default Results;