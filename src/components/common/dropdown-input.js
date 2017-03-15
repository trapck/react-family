import React, {PropTypes} from "react";
import {SimpleSelect} from "react-selectize";
import "react-selectize/themes/index.css";

const DropDownInput = props => {
	const onChange = (item = {}) => {
		props.onChange(props.tag, {label: item.label, value: item.value, isDropDown: true}, item);
	},
		onBlur = (item = {}) => {
			item.value = item.value || {};
			props.onBlur(props.tag, {label: item.value.label, value: item.value.value, isDropDown: true}, item);
		},
		onOpenChange = isOpened => {props.onOpenChange(isOpened);};
	return (
		<div className = {props.containerClassName}>
			<SimpleSelect
				className = {props.inputClassName}
				value = {props.value}
				onValueChange = {onChange}
				onBlur = {onBlur}
				onOpenChange = {onOpenChange}
				options = {props.options}
				placeholder = {props.placeholder}
			/>
		</div>
	);
};


DropDownInput.propTypes = {
	options: PropTypes.array.isRequired,
	value: PropTypes.object,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	onOpenChange: PropTypes.func,
	validateFn: PropTypes.func,
	containerClassName: PropTypes.string,
	inputClassName: PropTypes.string,
	tag: PropTypes.string,
	placeholder: PropTypes.string
};

DropDownInput.defaultProps = {
	options: [],
	onChange: Function.prototype,
	onBlur: Function.prototype,
	onOpenChange: Function.prototype,
	containerClassName: "text-input-container",
	inputClassName: "text-input"
};

export default DropDownInput;
