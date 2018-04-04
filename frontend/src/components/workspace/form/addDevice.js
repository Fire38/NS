import $ from 'jquery';
import React from 'react';
import DjangoCSRFToken from 'django-react-csrftoken';

import SingleInput from './components/singleInput';
import RadioGroup from './components/radioGroup';
import TextArea from './components/textArea';


export class AddDevice extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			'host_ip': '',
			'description': '',
		}
		this.handleIp = this.handleIp.bind(this);
		this.handleDescription = this.handleDescription.bind(this);
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleClearForm = this.handleClearForm.bind(this);
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
	}	
	
	handleIp(e){
		this.setState({'host_ip': e.target.value})
	}

	handleDescription(e){
		this.setState({'description': e.target.value})
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
		return(
			<div className="row col-6">
				<div className="form" >
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
								required
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
		)
	}
}