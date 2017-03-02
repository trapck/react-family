import React, {PropTypes} from "react";

class TextInput extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	validateChange(value) {
		return !this.props.regex && !this.props.validateFn
			|| (this.props.regex && this.props.regex.test(value))
			|| (this.props.validateFn && this.props.validateFn(value));
	}

	onChange(e) {
		if (this.validateChange(e.target.value)) {
			this.props.onChange(this.props.tag, e.target.value, e);
		}
	}

	onBlur(e) {
		this.props.onBlur(this.props.tag, e.target.value, e);
	}

	render() {
		return (
			<div className={this.props.containerClassName}>
				<input
					className={this.props.inputClassName}
					onChange={this.onChange}
					onBlur={this.onBlur}
					value={this.props.value}
				/>
			</div>
		);
	}
}

TextInput.propTypes = {
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	value: PropTypes.string,
	regex: PropTypes.object,
	validateFn: PropTypes.func,
	containerClassName: PropTypes.string,
	inputClassName: PropTypes.string,
	tag: PropTypes.string
};

TextInput.defaultProps = {
	onChange: Function.prototype,
	onBlur: Function.prototype,
	value: "",
	containerClassName: "text-input-container",
	inputClassName: "text-input"
};

export default TextInput;
