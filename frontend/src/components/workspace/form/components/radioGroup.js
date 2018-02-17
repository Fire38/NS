import React from 'react';
import PropTypes from 'prop-types';

export class RadioGroup extends React.Component{
	render(){
		return (
		<div className="radioButton">
			{this.props.options.map((option) =>(

					<label key={option} className="form-label">
						<input
							className="form-checkbox"
							name={this.props.setName}
							onChange={this.props.controlFunc}
							value={option}
							checked={this.props.selectedOptions.indexOf(option) > -1}
							type={this.props.type} /> {option}
					</label>
				
			))}
		
		</div>
		);

		
	}
}

RadioGroup.propTypes = {
	title: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['checkbox', 'radio']).isRequired,
	setName: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	selectedOptions: PropTypes.array,
	controlFunc: PropTypes.func.isRequired
};

export default RadioGroup