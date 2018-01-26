import React from 'react';
import ReactDOM from 'react-dom';
//https://www.npmjs.com/package/django-react-csrftoken
import DjangoCSRFToken from 'django-react-csrftoken';
import $ from 'jquery';


export class AddForm extends React.Component{
	constructor(props){
		super(props);
		this.state = { };
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	
	componentDidMount() {
		document.title = "Добавить устройство"
		ReactDOM.findDOMNode(this.refs.ip).focus()
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

	
	onChange(e){
		this.setState({[e.target.name]: e.target.value});
		console.log('YA TUT')
		
	}
	
	async handleSubmit(e){
		e.preventDefault();

		let res = await fetch('api/devices/add/', {
			method: 'POST',
			headers:{ 
				'X-CSRFToken': this.getCookie("csrftoken"),
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		}).then(response => response.json());
		this.setState({'successing_create': res.successing_create})
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
					
					
					<input
						type='text'
						className='addHostIp'
						name='host_ip'
						placeholder='Введите ip'
						ref='ip'
						onChange={this.onChange}
						required
					/>
					<br/>
					<input
						type='text'
						className='addAddress'
						name='address'
						placeholder='Введите адрес'
						onChange={this.onChange}
						required
					/>
					<br/>
					<textarea
						className='addDescription'
						name='description'
						placeholder='Описание'
						onChange={this.onChange}
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
			)
		}
}

