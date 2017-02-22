import React, {PropTypes} from "react";

const TextInput = props => {
	const onChange = e => props.onChange(e.value, e);
	return (
		<div className = {props.containerClassName}>
			<input className = {props.inputClassName} onChange = {onChange} value = {props.value} />
		</div>
	);
};

TextInput.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string,
	containerClassName: PropTypes.string,
	inputClassName: PropTypes.string
};

TextInput.defaultProps = {
	onChange: Function.prototype,
	value: "",
	containerClassName: "text-input-container",
	inputClassName: "text-input"
};

export default TextInput;
