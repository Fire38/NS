import React from 'react';
import {CircleMarker, Popup} from 'react-leaflet';

export default class NetworkPointLayer extends React.Component{
	render(){
		
		let netPoints = this.props.networkPoints
		console.log(this.props.enable)
		if (this.props.enable){
			return (
				<div>
					{netPoints.map((point, pointIndex) => (
						<CircleMarker center={[point.lat, point.lng]} color="green" radius={5} fillOpacity={1.0} key={pointIndex}>
							<Popup children={
									<div>
										<span><b>Устройство:</b> {point.device_type}</span><br/>
										<span><b>IP:</b> {point.host_ip}</span><br/>
										<span><b>Адрес:</b> {point.address}</span><br/>
										<span><b>Активность:</b> {point.access ? 'Активно' : 'Неактивно'}</span><br/>
										<span><b>Описание:</b> {point.description ? point.description : 'Отсутствует'}</span><br/>
										<span><a href={'/detail/'+point.id}>Детали</a></span>
									</div>
								}/>
						</CircleMarker>
					))}
				</div>
			)
		} else{
			return <div></div>
		}
		
	}
}