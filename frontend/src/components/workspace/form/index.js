import React from 'react';
import ReactDOM from 'react-dom';
//https://www.npmjs.com/package/django-react-csrftoken
import DjangoCSRFToken from 'django-react-csrftoken';
import $ from 'jquery';

//https://lorenstewart.me/2016/10/31/react-js-forms-controlled-components/
import { AddDevice } from './addDevice';
import { AddNetworkPointFrom } from './addNetworkPoint';
import { BindForm } from './bindDeviceAndNP';


export class Form extends React.Component{
	componentDidMount() {
		document.title = "Добавить устройство";
	}
	
	render(){
		return (
			<div>
				<div className="row">
					<AddDevice/>
				</div>
					
				<div className="row">
					<AddNetworkPointFrom/>
				</div>
				<div className="row">
					<BindForm/>
				</div>
			</div>
		)
	}
}

