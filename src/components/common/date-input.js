import React, {PropTypes} from "react";
import {DateField} from "react-date-picker";
import "react-date-picker/index.css";

class DateInput extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount() {
		this.refs.input.focus();
	}

	onChange(dateString, {dateMoment}) {
		this.props.onChange(this.props.tag, new Date(dateMoment._d));
	}

	onKeyPress(e) {
		if(e.key == "Enter"){
			e.preventDefault();
			e.stopPropagation();
			this.refs.input.getInput().blur();
		}
	}

	render() {
		return (<DateField
			forceValidDate
			ref="input"
			onChange={this.onChange}
			onBlur={this.onBlur}
			onKeyPress={this.onKeyPress}
			value={this.props.value}
			updateOnDateClick
			expandOnFocus={false}
			dateFormat="DD-MM-YYYY"
			/>);
	}
}

DateInput.propTypes = {
	value: PropTypes.object,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	tag: PropTypes.string
};

DateInput.defaultProps = {
	onChange: Function.prototype,
	onBlur: Function.prototype,
	tag: ""
};

export default DateInput;
