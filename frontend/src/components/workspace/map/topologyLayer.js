import React from 'react';
import { Polyline } from 'react-leaflet';


export default class TopologyLayer extends React.Component{
	

	render(){
		//console.log(this.props)
		if (this.props.enable){
			let polyline1 = this.props.coord
			return(
			<Polyline color="grey" positions={polyline1} />
			)
		}else{
			return(
				<button> Сеть </button>
			
				)
		}
	}
}


