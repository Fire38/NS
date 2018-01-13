import React from 'react';
import ReactDOM from 'react-dom';
//https://www.npmjs.com/package/django-react-csrftoken
import DjangoCSRFToken from 'django-react-csrftoken';

export class AddForm extends React.Component{
	componentDidMount() {
		document.title = "Добавить устройство"
		ReactDOM.findDOMNode(this.refs.ip).focus()
	}
	render(){
		return (
			<div className="container">
			<form className='addDevice' method='POST' action='api/devices/add/'>
				<DjangoCSRFToken />
				<div className='radioGroup'>
					<label>
						<input
							type='radio'
							name='device_type'
							value='ups'
						/>
						LogNetUPS
					</label>
					<label>
						<input
							type='radio'
							name='device_type'
							value='logdog'
						/>
						LogNetDOG
					</label>
					<label>
						<input
							type='radio'
							name='device_type'
							value='switch'
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
					defaultValue=''
					placeholder='Введите ip'
					ref='ip'
					required
				/>
				<br/>
				<input
					type='text'
					className='addAddress'
					name='address'
					placeholder='Введите адрес'
					ref='address'
					required
				/>
				<br/>
				<textarea
					className='addDescription'
					name='description'
					defaultValue=''
					placeholder='Описание'
					ref='description'
				/>
				<br/>
				<button
					className='addButton'>
					Добавить
				</button>
				
			</form>
			</div>
		)
	}
}