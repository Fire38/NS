import React from 'react';
import PropTypes from 'prop-types';

export class SingleInput extends React.Component{
	render(){
		return(
			<input 
				className={this.props.className}
				name = { this.props.name }
				type = { this.props.inputType }
				value = { this.props.content }
				onChange = { this.props.controlFunc }
				placeholder = { this.props.placeholder }
				 />
		)
	}
}

SingleInput.propTypes = {
	inputType: PropTypes.oneOf(['text', 'number']).isRequired,
	title: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	controlFunc: PropTypes.func.isRequired,
	content: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
	]).isRequired,
	placeholder: PropTypes.string,
};

export default SingleInput;