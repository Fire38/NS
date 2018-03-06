import React from 'react';

export class Logout extends React.Component{
	constructor(props){
		super(props)
		this.logoutRequest = this.logoutRequest.bind(this)
	}

	
	async logoutRequest(){
		await fetch('/logout')
	}
	
	render(){
		this.logoutRequest()
		return <h1>pff</h1>
	}
}