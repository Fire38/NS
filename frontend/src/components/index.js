import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Header } from './header/';
import { MonitoringDisplay } from './workspace/monitoringDisplay/';
import { Form } from './workspace/form/';
import { DeviceDetail } from './workspace/monitoringDisplay/deviceDetail/';
import { SimpleExample } from './workspace/map/';
import { Logout } from './other/Logout.js'

export class App extends React.Component{
	render(){
		return(
			<div>
				<Header />
				
				<main>
					<Switch>
					{/*
						<Route exact path='/' activeClassName="active" component={ NetworkStatistic } />
						<Route path='/device/:type' component={ DevicesController } />
						*/}
						<Route exact path='/' activeClassName="active" component={ MonitoringDisplay } />
						<Route path='/device' component={ MonitoringDisplay } />
						<Route path='/add_device' component={ Form } />
						<Route path='/detail/:id' component={ DeviceDetail } />
						<Route path='/map' component={ SimpleExample } />
						<Route path='/logout' component={ Logout } />
					</Switch>
				</main>
					
				
			</div>
		)
	}
}