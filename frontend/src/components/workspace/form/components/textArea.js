import React from 'react';
import PropTypes from 'prop-types';

export class TextArea extends React.Component{
	render(){
		return(
			<textarea
					className={this.props.className}
					style = {this.props.resize ? null : {resize: 'none'}}
					name = {this.props.name}
					rows = {this.props.rows}
					value = {this.props.content}
					onChange = {this.props.controlFunc}
					placeholder = {this.props.placeholder} />
					
		)
	}
}

TextArea.propTypes = {
	title: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	resize: PropTypes.bool,
	placeholder: PropTypes.string,
	controlFunc: PropTypes.func.isRequired
}

export default TextArea;