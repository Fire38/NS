import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component{
	render(){
		let opt = this.props.options

		return(
			<div className='form-group'>
				<select
					name={this.props.name}
					value={this.props.selectedOption}
					onChange={this.props.controlFunc}
					className='form-select'>
					<option value="">{this.props.placeholder}</option>
					
					{opt};
					
				</select>
			</div>
		)
	}
}




Select.propTypes = {
	name: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOption: PropTypes.string,
	controlFunc: PropTypes.func.isRequired,
	placeholder: PropTypes.string
}