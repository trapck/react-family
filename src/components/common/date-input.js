import React, {PropTypes} from "react";
import {DateField, Calendar} from "react-date-picker";
import "react-date-picker/index.css";

const DateInput = props => {
	const onChange = (dateString, {dateMoment}) => {
		props.onChange(props.tag, new Date(dateMoment._d));
	};
	return (<DateField
		forceValidDate
		onChange = {onChange}
		value = {props.value}
		updateOnDateClick
		expandOnFocus = {false}
		dateFormat="DD-MM-YYYY"
	/>);
};

DateInput.propTypes = {
	value: PropTypes.object,
	onChange: PropTypes.func.isRequired,
	tag: PropTypes.string
};

DateInput.defaultProps = {
	value: new Date(),
	tag: ""
};

export default DateInput;
