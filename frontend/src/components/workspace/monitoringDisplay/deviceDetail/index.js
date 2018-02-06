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
					deviceLastActivity:''}
	}
	
	componentDidMount(){
		document.title = 'Детали'
		this.loadDevice()
	}
	
	async loadDevice(){
			let res = await fetch("/api/device/" + this.state.deviceId + "/").then(response => response.json())
			let d = new Date(res.last_activity).toLocaleString('ru')
			console.log(d)
			this.setState({deviceType: res.device_type,
						  deviceIP: res.host_ip,
						  deviceAddress: res.address,
						  deviceAccessStatus: res.access_status,
						  deviceDescription: res.description,
						  deviceLastActivity: d
						  })
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
					<li><strong>Последнее появление в сети:</strong> { this.state.deviceLastActivity } </li>
				</ul>
			</div>
		)
	}
}