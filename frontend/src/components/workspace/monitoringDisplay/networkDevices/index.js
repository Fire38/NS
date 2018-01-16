import React from 'react';
import { Link } from 'react-router-dom';
import nut from '../../../../images/nut.png'


/* Статистика на главной */
export class NetworkStatistic extends React.Component{
	componentDidMount(){
		document.title = 'Главная'
		console.log('Загрузка статки')
	}
	render(){
		return(
			<p> Здесь статка </p>
		)
	}
}


/* Строка для девайсов */
export class NetworkElementsRow extends React.Component {
	render(){
		let networkArray = this.props.array
		return (
			<tr>{
				networkArray.map((device, index) => (
					<NetworkElements key = {index} index = {index} host_ip = {device.host_ip} access_status = {device.access_status} id = {device.id}/>
				))
			}
			</tr>
		)
	}
}


/* Элемент сети */
export class NetworkElements extends React.Component {
	render(){
		let color = this.props.access_status === true ? "green" : "red";
		let detailUrl = '/detail/' + this.props.id ;
		return (
			<td bgcolor={color} key={this.props.id} > {this.props.host_ip} <Link to={detailUrl}><img src={nut} alt='детали'/></Link> </td>
		)
	}
}
