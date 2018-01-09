import React from 'react';
import { Link } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './header/';

import { Workspace } from './workspace/';

import { AddForm } from './workspace/addForm';
export class App extends React.Component{
	render(){
		return(
			<div>
				<Header />
				<Workspace />
				
					<Route path='/add_device' activeClassName="active" component={ AddForm } />
				
			</div>
		)
	}
}