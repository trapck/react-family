import React, {PropTypes} from "react";
import {DateField, Calendar} from "react-date-picker";
import "react-date-picker/index.css";

class DateInput extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentWillMount() {
		// To fix date default date in state
		this.props.onChange(this.props.tag, new Date());
	}

	onChange(dateString, {dateMoment}) {
		this.props.onChange(this.props.tag, new Date(dateMoment._d));
	}

	render() {
		return (<DateField
			forceValidDate
			onChange={this.onChange}
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
	tag: PropTypes.string
};

DateInput.defaultProps = {
	value: new Date(),
	onChange: Function.prototype,
	tag: ""
};

export default DateInput;
