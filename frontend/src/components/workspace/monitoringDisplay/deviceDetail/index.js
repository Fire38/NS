import React from 'react';

export class DeviceDetail extends React.Component{
	constructor(props){
		super(props)
		this.state = {deviceId: this.props.match.params.id,
					deviceType:'',
					deviceIP:'',
					deviceAddress:'',
					deviceAccessStatus:'',
					deviceDescription:''}
	}
	
	componentDidMount(){
		document.title = 'Детали'
		this.loadDevice()
	}
	
	async loadDevice(){
			let res = await fetch("/api/device/" + this.state.deviceId + "/").then(response => response.json())
			console.log(res)
			this.setState({deviceType: res.device_type,
						  deviceIP: res.host_ip,
						  deviceAddress: res.address,
						  deviceAccessStatus: res.access_status,
						  deviceDescription: res.description
						  })
	}
	
	render(){
		let status = this.state.deviceAccessStatus ? 'Доступен' : 'Не доступен';
		
		return (
			<div className='container'>
				<h3>Детали </h3>
				<ul>
					<li>Тип: { this.state.deviceType } </li>
					<li> IP: { this.state.deviceIP } </li>
					<li>Адрес: { this.state.deviceAddress } </li>
					<li>Статус: { status } </li>
					<li>Описание: { this.state.deviceDescription } </li>
				</ul>
			</div>
		)
	}
}