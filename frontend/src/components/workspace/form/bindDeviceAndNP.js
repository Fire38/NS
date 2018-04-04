import React from 'react';
import DjangoCSRFToken from 'django-react-csrftoken';
import $ from 'jquery';

import SingleInput from './components/singleInput';
import AddressField from './components/dropDown';
import Select from './components/select';
import { Map, TileLayer } from 'react-leaflet';


export class BindForm extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			deviceOptions: [],
			networkPoint: '',
			selectedValue: '',
		}
		this.handleSelectedDevice = this.handleSelectedDevice.bind(this);
		this.getDevice = this.getDevice.bind(this);
		this.handleBindSubmit = this.handleBindSubmit.bind(this);
		this.handleNP = this.handleNP.bind(this);
		this.getCookie = this.getCookie.bind(this);

	}
	
	componentDidMount(){
		this.getDevice();
	}
	
	getCookie(name){
		var cookieValue = null;
		if (document.cookie && document.cookie != ''){
			var cookies = document.cookie.split(';');
			for (var i=0; i<cookies.length; i++){
				var cookie = $.trim(cookies[i]);
				if (cookie.substring(0, name.length + 1) == (name + '=')){
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;
				}
			}
		}
		return cookieValue;
	}
	
	async getDevice(){
		let res = await fetch('/api/devices/all/').then(response => response.json());
		// а так неуправляемые
		let res1 = await fetch('/api/unmanaged_devices/').then(response => response.json());
		let res3 = res.concat(res1)
		this.setState({'deviceOptions': res3})
	}
	
	
	
	handleSelectedDevice(e){
		this.setState({'selectedValue': e.target.value})
		console.log(this.state.selectedValue)
	}
	
	handleNP(e){
		this.setState({networkPoint: e.target.value})
	}
	
	async handleBindSubmit(e){
		e.preventDefault();
		let data = {}
		data['device'] = this.state.selectedValue
		data['networkPoint'] = this.state.networkPoint
		console.log(data)
		let res = await fetch('api/bind/',{
			method: 'POST',
			credentials: 'same-origin',
			headers:{ 
				'X-CSRFToken': this.getCookie("csrftoken"),
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
			}).then(response => response.json())
	}


	
	
	
	render(){
		let options = this.state.deviceOptions
		var optArr = options.map(opt =>
								 <option key={opt.key} value={opt.id}>{opt.name ? opt.name: opt.device_type + " " + opt.host_ip}</option>
								 )

		return(
			<div className="form">
				<form className="bindAddressDeviceForm" onSubmit={this.handleBindSubmit}>
				<h4> Привязать устройство </h4>
					<Select
						name={'selectDevice'}
						controlFunc={this.handleSelectedDevice}
						placeholder={'Выберите устройство'}
						
						options={optArr}
						selectedOption = {this.state.selectedValue}
					/>
					<SingleInput
						className = {'networkPoint'}
						inputType = {'text'}
						title = {'NP'}
						name = {'network_point'}
						controlFunc = {this.handleNP}
						content = {this.state.networkPoint}
						placeholder = {'Введите id сетевого узла'}
						required
					/>
					<br/>
						<button
							className='addButton'
							type='submit'
							value='Submit'>
							Связать
						</button>
				</form>
			</div>
		)}
}