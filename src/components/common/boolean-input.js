import React, {PropTypes} from "react";

class BooleanInput  extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange(e) {
		this.props.onChange(this.props.tag, e.target.checked, e);
	}

	render() {
		return (
			<div className={this.props.containerClassName}>
				<input
					className = {this.props.inputClassName}
					type = "checkbox"
					checked = {!!this.props.value}
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
	tag: PropTypes.string
};

BooleanInput.defaultProps = {
	onChange: Function.prototype,
	value: false,
	containerClassName: "boolean-input-container",
	inputClassName: "boolean-input"
};

export default BooleanInput;
