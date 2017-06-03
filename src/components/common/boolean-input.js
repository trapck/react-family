import React, {PropTypes} from "react";

class BooleanInput  extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		if (!this.props.isFocusCanceled) {
			this.refs.input.focus();
		}
	}

	onChange(e) {
		this.props.onChange(this.props.tag, e.target.checked, e);
	}

	render() {
		const {
			containerClassName,
			inputClassName,
			value
			} = this.props;
		return (
			<div className={containerClassName}>
				<input
					ref="input"
					className = {inputClassName}
					type = "checkbox"
					checked = {!!value}
					onChange = {this.onChange}
					/>
			</div>
		);
	}
}

BooleanInput.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.bool,
	containerClassName: PropTypes.string,
	inputClassName: PropTypes.string,
	tag: PropTypes.string,
	isFocusCanceled: PropTypes.bool
};

BooleanInput.defaultProps = {
	onChange: Function.prototype,
	value: false,
	containerClassName: "boolean-input-container",
	inputClassName: "boolean-input"
};

export default BooleanInput;
