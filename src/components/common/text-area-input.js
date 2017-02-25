import React, {PropTypes} from "react";

class TextAreaInput  extends React.Component {
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
		this.props.onBlur(e);
	}

	render() {
		return (
			<div className={this.props.containerClassName}>
				<textarea
					cols={this.props.cols}
					rows={this.props.rows}
					className={this.props.inputClassName}
					onChange={this.onChange}
					onBlur={this.onBlur}
					value={this.props.value}
					style={{resize: "none"}}
				/>
			</div>
		);
	}
}

TextAreaInput.propTypes = {
	cols: PropTypes.number,
	rows: PropTypes.number,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	value: PropTypes.string,
	regex: PropTypes.object,
	validateFn: PropTypes.func,
	containerClassName: PropTypes.string,
	inputClassName: PropTypes.string,
	tag: PropTypes.string
};

TextAreaInput.defaultProps = {
	cols: 50,
	rows: 3,
	onChange: Function.prototype,
	onBlur: Function.prototype,
	value: "",
	containerClassName: "text-area-input-container",
	inputClassName: "text-area-input"
};

export default TextAreaInput;
