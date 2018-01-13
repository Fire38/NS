import React from 'react';
import { DevicesController } from './deviceController/';
import { NetworkStatistic } from './networkDevices/';
import { Menu } from './menu/';
import { Route, Switch } from 'react-router-dom';


export class MonitoringDisplay extends React.Component{
	render(){
		return (
			<div className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
				<Menu />
				<Switch>
					<Route exact path='/' activeClassName="active" component={ NetworkStatistic } />
					<Route path='/device/:type' component={ DevicesController } />
				</Switch>
			</div>					
		)
	}
}