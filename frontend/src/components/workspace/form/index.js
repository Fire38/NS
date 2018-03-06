import React from 'react';
import ReactDOM from 'react-dom';
//https://www.npmjs.com/package/django-react-csrftoken
import DjangoCSRFToken from 'django-react-csrftoken';
import $ from 'jquery';
import SingleInput from './components/singleInput';
import RadioGroup from './components/radioGroup';
import TextArea from './components/textArea';
import AddressField from './components/dropDown';
import { Combobox } from 'react-widgets'
import { Map, TileLayer } from 'react-leaflet';
//https://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/

	
export class AddForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			'host_ip': '',
			'address': '',
			'description': '',
			'device': '',
			'addressOptions': [],
			'openAddressList': false,
			'deviceOptions': [],
			'openDeviceList': false,
			'lat': '',
			'lng': '',
			'connected_from': 0
		}
		this.handleIp = this.handleIp.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
		
		this.handleFocusAddressList = this.handleFocusAddressList.bind(this);
		this.handleBlurAddressList = this.handleBlurAddressList.bind(this);
		this.handleAddressList = this.handleAddressList.bind(this);
		this.getAddressOptions = this.getAddressOptions.bind(this);
		
		this.handleFocusDeviceList = this.handleFocusDeviceList.bind(this);
		this.handleBlurDeviceList = this.handleBlurDeviceList.bind(this);
		this.handleDeviceList = this.handleDeviceList.bind(this);
		this.getDeviceOptions = this.getDeviceOptions.bind(this);
		this.handleBindSubmit = this.handleBindSubmit.bind(this);

	}

	
	componentDidMount() {
		document.title = "Добавить устройство";
		const leafletMap = this.leafletMap.leafletElement;
		leafletMap.on('click', (e) => {
			console.log(e.latlng)
			this.setState({
				lat: e.latlng.lat,
				lng: e.latlng.lng
			})
		})
		//ReactDOM.findDOMNode(this.refs.ip).focus()
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
			console.log('мы тут')
			console.log(input)
			let res = await fetch('/api/dropdownaddresses/' + input + '/').then((response) => response.json())
			//console.log(res)
			this.setState({'addressOptions': res})
		}
	}
	
	
	onChange(e){
		this.setState({[e.target.name]: e.target.value});
		console.log('YA TUT')
		
	}
	
	handleIp(e){
		this.setState({'host_ip': e.target.value})
	}
	
	handleDescription(e){
		this.setState({'description': e.target.value})
	}
	
	async handleSubmit(e){
		e.preventDefault();
		let res = await fetch('api/devices/add/', {
			method: 'POST',
			credentials: 'same-origin',
			headers:{ 
				'X-CSRFToken': this.getCookie("csrftoken"),
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		}).then(response => response.json());
		this.setState({'successing_create': res.successing_create})
		console.log(this.state)
		this.handleClearForm(e);
	}

	handleClearForm(e){
		//e.preventDefault
		this.setState({
			'host_ip': '',
			'address': '',
			'description': '',
		});
	}
	
	/*обработка списка адресов*/	
	handleAddressList(e){
		this.setState({address: e})
		//console.log('Новое значение ' + newValue)
		this.getAddressOptions(e)
		}
	
	handleFocusAddressList(){
		this.setState({openAddressList: true})
		console.log('Я отработал')
	}
	
	handleBlurAddressList(){
		this.setState({openAddressList: false})
	}
	
	
	/*обработка списка сетевых точек*/
	async getDeviceOptions(input){
		if (!input || input.length < 9){
			return Promise.resolve({ deviceOptions: [] });
		}else{
			let res = await fetch('/api/dropdowndevices/' + input + '/').then((response) => response.json())
			this.setState({'deviceOptions': res})
		}
	}
	
	handleDeviceList(e){
		this.setState({device: e})
		//console.log('Новое значение ' + newValue)
		this.getDeviceOptions(e)
		}
	
	handleFocusDeviceList(){
		this.setState({openDeviceList: true})
		console.log('Я отработал')
	}
	
	handleBlurDeviceList(){
		this.setState({openDeviceList: false})
	}
	
	async handleBindSubmit(e){
		console.log(this.state.address)
		console.log(this.state.device)
		e.preventDefault();
		let data = {}
		data['address'] = this.state.address
		data['device'] = this.state.device
		data['lat'] = this.state.lat
		data['lng'] = this.state.lng
		data['connected_from'] = this.state.connected_from
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
		const position = [56.1585, 101.6185]
		const zoom = 14
		let l = ({item}) =>(
					<span> {item} </span>);
				
				
				
		let info = this.state.successing_create
		if (info === true){
			var infoBlock =(
							<div className="alert alert-success" role="alert">
								Устройство успешно добавлено
							</div>)
		} else if (info === false){
			var infoBlock = (<div className="alert alert-warning" role="alert">
								При добавлении устройства произошла ошибка, возможно запись с таким ip уже существует
							</div>)
		}
		
			return (
				<div>
					<div className="row">
						<div id="addressForm" >
							<form className='addDeviceForm'  onSubmit={this.handleSubmit}>
								<DjangoCSRFToken/>
									<div className='radioGroup' >
										<label>
											<input
												type='radio'
												name='device_type'
												value='ups'
												onChange={this.onChange}
											/>
											LogNetUPS
											
											<input
												type='radio'
												name='device_type'
												value='logdog'
												onChange={this.onChange}
											/>
											LogNetDOG
										
											<input
												type='radio'
												name='device_type'
												value='switch'
												onChange={this.onChange}
												required
											/>
											Коммутатор
										</label>
									</div>
									<br/>
									<SingleInput
										className = {'addHostIp'}
										inputType = {'text'}
										title = {'IP'}
										name = {'host_ip'}
										controlFunc = {this.handleIp}
										content = {this.state.host_ip}
										placeholder = {'Введите ip'}
										/>
									<br/>
									<TextArea
											className  = {'addDescription'}
											title = {''}
											rows = {4}
											resize = {false}
											content = {this.state.description}
											name = {'description'}
											controlFunc = {this.handleDescription}
											placeholder = {'Описание'} />
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
						
					<div className="row">
						<div id="bindAddressDevice">
							<h4> Привязать устройство </h4>
							<form className="bindAddressDeviceForm" onSubmit={this.handleBindSubmit}>
								<Combobox
										onChange = {this.handleAddressList}
										value = {this.state.address}
										data = {this.state.addressOptions.map(
																	   (option) => option.street_and_house
																	   )}
			
										onFocus = {this.handleFocusAddressList}
										onBlur = {this.handleBlurAddressList}
										open = {this.state.openAddressList}
										placeholder="Введите адрес"
										itemComponent={l}
										/>
									
									<Combobox
										onChange = {this.handleDeviceList}
										value = {this.state.device}
										data = {this.state.deviceOptions.map(
																	   (option) => option.host_ip
																	   )}
			
										onFocus = {this.handleFocusDeviceList}
										onBlur = {this.handleBlurDeviceList}
										open = {this.state.openDeviceList}
										placeholder="Укажите точку"
										itemComponent={l}
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
											</Map>
										</div>
								<button
									className='addButton'
									type='submit'
									value='Submit'>
									Добавить
								</button>
							</form>
						</div>
					</div>
				</div>
				
			)
		}
}

