import React, {PropTypes} from "react";
import {SimpleSelect} from "react-selectize";
import "react-selectize/themes/index.css";

class DropDownInput extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onOpenChange = this.onOpenChange.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
	}

	componentDidMount() {
		if (!this.props.isFocusCanceled) {
			this.refs.input.refs.select.focusOnInput();
		}
		this.refs.input.refs.select.refs.control.addEventListener("keypress", this.onKeyPress);
	}

	onChange(item = {}) {
		this.props.onChange(this.props.tag, {label: item.label, value: item.value, isDropDown: true}, item);
	}
	onBlur(item = {}) {
			item.value = item.value || {};
			this.props.onBlur(this.props.tag, {label: item.value.label, value: item.value.value, isDropDown: true}, item);
	}

	onOpenChange(isOpened) {
		this.props.onOpenChange(isOpened);
	}

	onKeyPress(e) {
		if(e.key == "Enter"){
			this.refs.input.blur();
		}
	}

	render() {
		return (
			<div className={this.props.containerClassName}>
				<SimpleSelect
					ref="input"
					className={this.props.inputClassName}
					value={this.props.value}
					onValueChange={this.onChange}
					onBlur={this.onBlur}
					onOpenChange={this.onOpenChange}
					options={this.props.options}
					placeholder={this.props.placeholder}
				/>
			</div>
		);
	}
}


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
	placeholder: PropTypes.string,
	isFocusCanceled: PropTypes.bool
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
