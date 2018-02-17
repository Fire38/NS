import React from 'react';
import ReactDOM from 'react-dom';
//https://www.npmjs.com/package/django-react-csrftoken
import DjangoCSRFToken from 'django-react-csrftoken';
import $ from 'jquery';
import SingleInput from './components/singleInput';
import RadioGroup from './components/radioGroup';
import TextArea from './components/textArea';

//https://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/

	
export class AddForm extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			'host_ip': '',
			'address': '',
			'description': ''
		}
		this.handleIp = this.handleIp.bind(this);
		this.handleAddress = this.handleAddress.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
	}

	
	componentDidMount() {
		document.title = "Добавить устройство"
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
	
	handleIp(e){
		this.setState({'host_ip': e.target.value})
	}
	
	handleAddress(e){
		this.setState({'address': e.target.value})
	}
	
	handleDescription(e){
		this.setState({'description': e.target.value})
	}
		
	onChange(e){
		this.setState({[e.target.name]: e.target.value});
		console.log('YA TUT')
		
	}
	
	handleClearForm(e){
		//e.preventDefault
		this.setState({
			'host_ip': '',
			'address': '',
			'description': '',
		});
	}
	
	async handleSubmit(e){
		e.preventDefault();
		console.log(this.getCookie("csrftoken"))
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

	
	render(){
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
				<div className="container">
				{infoBlock}
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
					<SingleInput
						className = {'addAddress'}
						inputType = {'text'}
						title = {'Address'}
						name = {'address'}
						controlFunc = {this.handleAddress}
						content = {this.state.address}
						placeholder = {'Введите адрес'} />

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
			)
		}
}

