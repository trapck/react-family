import React, {PropTypes} from "react";
import {SimpleSelect} from "react-selectize";
import "react-selectize/themes/index.css";

const DropDownInput = props => {
	const onChange = (item = {}) => {
		props.onChange(props.tag, {label: item.label, value: item.value, isDropDown: true}, item);
	},
		onBlur = e => {props.onBlur(e);},
		onOpenChange = isOpened => {props.onOpenChange(isOpened);};
	return (
		<div>
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
