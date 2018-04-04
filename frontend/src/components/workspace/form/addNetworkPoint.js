import $ from 'jquery';
import React from 'react';
import DjangoCSRFToken from 'django-react-csrftoken';

import Select from './components/select';
import TextArea from './components/textArea';
import SingleInput from './components/singleInput';

import NetworkPointLayer from '../map/networkPointLayer';
import { Combobox } from 'react-widgets';
import { Map, TileLayer } from 'react-leaflet';


export class AddNetworkPointFrom extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			address: '',
			lat: '',
			lng: '',
			description: '',
			connectedFrom: 0,
			addressOptions: [],
			connectedFromOptions: [],
			openAddressList: false,
			networkPoints: []
		}
		this.getAddressOptions = this.getAddressOptions.bind(this);
		this.getNetworkPoint = this.getNetworkPoint.bind(this);
		this.handleConnectedFrom = this.handleConnectedFrom.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.handleAddressList = this.handleAddressList.bind(this);
		this.handleFocusAddressList = this.handleFocusAddressList.bind(this);
		this.handleBlurAddressList = this.handleBlurAddressList.bind(this);

		this.handleAddNPSubmit = this.handleAddNPSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		

	}
	
	
	componentDidMount(){
		const leafletMap = this.leafletMap.leafletElement;
		leafletMap.on('click', (e) => {
			this.setState({
				lat: e.latlng.lat,
				lng: e.latlng.lng
			})
		});
		this.getNetworkPoint()
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
	
	async getAddressOptions(input){
		if (!input || input.length < 3){
			return Promise.resolve({ addressOptions: [] });
		}else{
			console.log(input)
			let res = await fetch('/api/dropdownaddresses/' + input + '/').then((response) => response.json())
			this.setState({'addressOptions': res})
		}
	}
	
	async getNetworkPoint(){
		let res = await fetch("/api/np/details/").then(response => response.json())
		this.setState({networkPoints: res})
	  }
  
	
	handleConnectedFrom(e){
		this.setState({connectedFrom: e.target.value})
	}
	
	handleDescription(e){
		this.setState({ description: e.target.value})
	}
	
	handleAddressList(e){
		this.setState({address: e})
		this.getAddressOptions(e)
		}
		
	handleFocusAddressList(){
		this.setState({openAddressList: true})
	}
	
	handleBlurAddressList(){
		this.setState({openAddressList: false})
	}
		
		
	
	handleClearForm(){
		this.setState({
			address: '',
			lat: '',
			lng: '',
			description: '',
			connected_from: 0
		})
	}
	
	async handleAddNPSubmit(e){
		e.preventDefault();
		let data = {}
		data['address'] = this.state.address
		data['lat'] = this.state.lat
		data['lng'] = this.state.lng
		data['description'] = this.state.description
		data['connected_from'] = this.state.connectedFrom
		let res = await fetch('api/np/',{
			method: 'POST',
			credentials: 'same-origin',
			headers:{ 
				'X-CSRFToken': this.getCookie("csrftoken"),
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
			}).then(response => response.json())
		this.handleClearForm();
	}
	
	render(){
		const position = [56.1585, 101.6185]
		const zoom = 14
		
		return(
			<div className="row col-6">
			<div className="form">
				
				<form className="addNetworkPointForm" onSubmit={this.handleAddNPSubmit}>
				<h4>Добавить узел</h4>
					<Combobox
						onChange = {this.handleAddressList}
						value = {this.state.address}
						data = {this.state.addressOptions.map(
							(option) => option.street_and_house
							)}
						onFocus = {this.handleFocusAddressList}
						onBlur = {this.handleBlurAddressList}
						open = {this.state.openAddressList}
						placeholder = "Введите адрес"
					/>
	
					<SingleInput
						className = {'lat'}
						inputType = {'text'}
						title = {'lat'}
						name = {'networkPoint_lat'}
						content = {this.state.lat}
						placeholder = {'Долгота'}
					/>
					<SingleInput
						className = {'lng'}
						inputType = {'text'}
						title = {'lng'}
						name = {'host_lng'}
						content = {this.state.lng}
						placeholder = {'Широта'}
					/>
					<div id="formMap">
						<Map ref={m => {this.leafletMap=m;}} center={position} zoom={zoom}>
							<TileLayer
								url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
							/>
							<NetworkPointLayer enable={true} networkPoints={this.state.networkPoints}/>
						</Map>
					</div>
					<div> Подключено с точки №:</div>
					<SingleInput
						className = {'connectedFrom'}
						inputType = {'text'}
						title = {'connectedFrom'}
						name = {'np'}
						content = {this.state.connectedFrom}
						placeholder = {'Подключено с точки №'}
						controlFunc = {this.handleConnectedFrom}
					/>
					<br/>

					
					<TextArea
						className = {'addDescription'}
						title = {''}
						rows = {2}
						resize = {false}
						content = {this.state.description}
						name = {'description'}
						controlFunc = {this.handleDescription}
						placeholder = {'Описание'}
					/>
					<br/>
					<button
						className='addButton'
						type='submit'
						value='Submit'>
						Добавить
					</button>
				</form>
			</div>
			</div>
		)
		
	}
}