import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { DevicesController } from './workspace';
import { NetworkStatistic } from './networkDevices';
import { Menu } from '../menu/';

export class Workspace extends React.Component{
	render(){
		return (
			<div>
				<Menu />
				<main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
					<Switch>
						<Route exact path='/' activeClassName="active" component={ NetworkStatistic } />
						<Route path='/device/:type' component={ DevicesController } />
					</Switch>
				</main>
			</div>					
		)
	}
}