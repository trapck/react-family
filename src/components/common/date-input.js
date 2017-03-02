import React, {PropTypes} from "react";
import {DateField, Calendar} from "react-date-picker";
import "react-date-picker/index.css";

class DateInput extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange(dateString, {dateMoment}) {
		this.props.onChange(this.props.tag, new Date(dateMoment._d));
	}

	onBlur() {
		debugger;
	}

	render() {
		return (<DateField
			forceValidDate
			onChange={this.onChange}
			onBlur={this.onBlur}
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
