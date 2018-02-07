import React from 'react';

export class DeviceDetail extends React.Component{
	constructor(props){
		super(props)
		this.state = {deviceId: this.props.match.params.id,
					deviceType:'',
					deviceIP:'',
					deviceAddress:'',
					deviceAccessStatus:'',
					deviceDescription:'',
					deviceLastActivity:'',
					deviceCreateDate:''}
		this.goBack = this.goBack.bind(this);
		this.deleteDevice = this.deleteDevice.bind(this)
	}
	
	
	componentDidMount(){
		document.title = 'Детали'
		this.loadDevice()
	}
	
	async loadDevice(){
			let res = await fetch("/api/device/" + this.state.deviceId + "/").then(response => response.json())
			console.log(res)
			let lastActivity = new Date(res.last_activity).toLocaleString('ru')
			let createDate = new Date(res.create_date).toLocaleString('ru')
			this.setState({deviceType: res.device_type,
						  deviceIP: res.host_ip,
						  deviceAddress: res.address,
						  deviceAccessStatus: res.access_status,
						  deviceDescription: res.description,
						  deviceLastActivity: lastActivity,
						  deviceCreateDate: createDate
						  })
	}
	
	goBack(){
		this.props.history.goBack()
	}
	
	async deleteDevice(){
		let result = window.confirm('Вы уверены что хотите удалить данное устройство?');
		console.log(result)
		if (result === true){
			let id = this.state.deviceId
			await fetch('/api/device/' + id + '/',{
				method: 'DELETE',
				headers:{
					'Accept': 'application/json',
					'Content-Type': 'application/json'
					}
				})
			this.props.history.push('/')
		}
	}


		
		
	render(){
		let status = this.state.deviceAccessStatus ? 'Доступен' : 'Не доступен';
		
		return (
			<div className='container'>
				<h3>Детали </h3>
				<ul>
					<li><strong>Тип: </strong> { this.state.deviceType } </li>
					<li><strong>IP</strong>: { this.state.deviceIP } </li>
					<li><strong>Адрес:</strong> { this.state.deviceAddress } </li>
					<li><strong>Статус:</strong> { status } </li>
					<li><strong>Описание:</strong> { this.state.deviceDescription } </li>
					<li><strong>Добавлен в систему:</strong> { this.state.deviceCreateDate } </li>
					<li><strong>Последнее появление в сети:</strong> { this.state.deviceLastActivity } </li>
				</ul>
				<button onClick={this.goBack}> Назад </button>
				<button onClick={this.deleteDevice}> Удалить устройство </button>
			</div>
		)
	}
}