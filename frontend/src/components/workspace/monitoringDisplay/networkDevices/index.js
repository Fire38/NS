import React from 'react';
import {Link} from 'react-router-dom';
import nut from '../../../../images/nut.png'


/* Статистика на главной */
export class NetworkStatistic extends React.Component{
	constructor(props){
		super(props);
		this.state = {
					deviceCount: '',
					activeDevices: '',
					inactiveDevices: ''
					};
	}
	
	componentDidMount(){
		document.title = 'Главная';
		this.loadStatistic();

	}
	
	async loadStatistic(){
		let res = await fetch("/api/statistic/").then(response => response.json());
		console.log(res);
		this.setState({
						deviceCount: res.device_count,
						activeDevices: res.active_devices,
						inactiveDevices: res.inactive_devices
					  });
	}
	
	render(){
		return(
			<div>
				<p><strong>Всего устройств:</strong> {this.state.deviceCount} </p>
				<p><strong>В сети:</strong> {this.state.activeDevices} </p>
				<p><strong>Не отвечают:</strong> {this.state.inactiveDevices} </p>
			</div>
			
		)
	}
}



/* Строка для девайсов */
export class NetworkElementsRow extends React.Component {
	render(){
		let networkArray = this.props.array
		return (
			<div className='row'>{
				networkArray.map((device, index) => (
					<NetworkElements key = {index} index = {index} host_ip = {device.host_ip} access_status = {device.access_status} id = {device.id}/>
				))
			}
			</div>
		)
	}
}


/* Элемент сети */
export class NetworkElements extends React.Component {
	render(){
		let color = this.props.access_status === true ? "green" : "red";
		let detailUrl = '/detail/' + this.props.id ;
		return (
			<div className='col-2'
				id='NetworkElements'
				style={{backgroundColor: color}}
				key={this.props.id}>
					{this.props.host_ip}
					<Link to={detailUrl}>
						<img className="details-icon" src={nut} alt='детали'/>
					</Link>
			</div>
		)
	}
}
