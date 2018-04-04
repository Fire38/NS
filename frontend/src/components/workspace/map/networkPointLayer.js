import React from 'react';
import {CircleMarker, Popup} from 'react-leaflet';


export default class NetworkPointLayer extends React.Component{
	render(){
		console.log(this.props.networkPoints)
		let netPoints = this.props.networkPoints;
		var manDevices = '',
			unmanDevices = '';
		
		
		if (this.props.enable){
			return (
				<div>
					{netPoints.map((point, pointIndex) => (
						<CircleMarker center={[point.lat, point.lng]} color="green" radius={3} fillOpacity={1.0} key={pointIndex}>
							
							<Popup children={
									
									<div key={pointIndex}>
										<span><b>ID:</b> {point.point_id}</span><br/>
										<span><b>ID родительской точки:</b> {point.parent_id}</span><br/>
										<span><b>Адрес:</b> {point.address}</span><br/>
										<span><b>Описание:</b> {point.description ? point.description : 'Отсутствует'}</span><br/>
										<hr/>
										<span><b>Оборудование:</b></span><br/>
										
										{
											manDevices = point.man_devices.map((device, deviceIndex) => (
												<div key={deviceIndex}>
													<span><b>Тип:</b> {device.device_type}</span><br/>
													<span><b>IP:</b> {device.host_ip}</span><br/>
													<span><b>Статус:</b> {device.access_status ? 'Доступен' : 'Не доступен'}</span><br/>
													<span><b>Последняя активность:</b> {new Date(device.last_activity).toLocaleString('ru')}</span><br/>
													<br/>
												</div>
											))}
																		   

										
										{
											unmanDevices = point.unman_devices.map((device, deviceIndex) => (
												<div key={deviceIndex}>
													<span>{device.name}</span><br/>
												</div>
											))
										}
										
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