import React, {PropTypes} from "react";
import TextInput from "./text-input";

class NumberInput  extends TextInput {
	constructor(props) {
		super(props);
	}

	getRegex() {
		let minus = this.props.isNegativeAllowed ? "?" : "{0}",
			dot = this.props.isInteger ? "{0}" : "?";
		return new RegExp(`^[-]${minus}[0-9]*[.]${dot}[0-9]*$`);
	}

	validateChange(value) {
		let regex = this.getRegex();
		return super.validateChange(value) && regex.test(value);
	}

	onBlur(e) {
		e.target.value = (Number(e.target.value) || 0).toFixed(this.props.isInteger ? 0 : this.props.precision);
		this.onChange(e);
	}
}

NumberInput.propTypes = {
	isInteger: PropTypes.bool,
	isNegativeAllowed: PropTypes.bool,
	precision: PropTypes.number
};

NumberInput.defaultProps = Object.assign({}, TextInput.defaultProps, {
	value: 0,
	precision: 2
});

export default NumberInput;
