import React from 'react';
import Select from 'react-select';


export default class AddressField extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			options: '',
			disabled: false,
			searchable: true,
			selectValue: 'sdfsdf',
			clearable: true,
			rtl: false,
		};

		this.getOptions = this.getOptions.bind(this);
	}
	
	componentDidMount(){

	}
	
	/*
	async getAddresses(){
		let res = await fetch('api/addresses/').then(response => response.json());
		
		var address_array = []
		for (let i=0; i<res.length; i++){
			address_array.push({value: res[i].id, label: res[i].street_and_house})
		}
		console.log(address_array)
		console.log(res)
		this.setState({options: address_array})
	} */
	
	async getOptions(input){
		if (!input){
			return Promise.resolve({ options: [] });
		}else{
			console.log(input)
			let res = await fetch('/api/addresses/' + input + '/').then((response) => response.json())
			console.log(res)
		}
		{/*
		return fetch('/api/addresses/' + input + '/')
		.then((response) => response.json())
		.then((json) => {
			return {options: json.items };
		}) */}
	}
	
	
	updateValue(newValue){
		this.setState({
			selectValue: newValue
		});
	}
	
	
	render(){
		var options = this.props.options.concat([options])
		console.log(options)
		return(
			<div>
				<input type="text"
						name="city"
						list="cityname"
						placeholder="Введите адрес"
						onChange={this.props.controlFunc}
						value={this.props.value}/>
				<div>
				<datalist id="cityname" style={{overflowY: "auto!important"}}>
				<div>
				{this.props.options.map(
										 (option) =>(
											<option key={option.id} value={option.street_and_house}/>
										 )
										 )}</div>
				</datalist>
				</div>
			</div>
		)
	}
}


/*
 return(
			<AsyncComponent
					multi={false}
					id="state-select"
					ref = {(ref) => {this.select=ref;}}
					onBlurResetsInput={false}
					onSelectResetsInput={false}
					autoFocus

					simpleValue
					clearable={this.state.clearable}
					name="selected-state"
					disabled={this.state.disabled}
					value={this.state.selectValue}
					onChange={this.updateValue}
					rtl={this.state.rtl}
					searchable={this.state.searchable}
					placeholder=''
					noResultsText=''

					loadOptions={this.getOptions}
					
				/>*/