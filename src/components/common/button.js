import React, {PropTypes} from "react";

class Button extends React.Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.onClick(this.props.onClickArguments);
	}

	render() {
		return (
			<button onClick={this.onClick} className={this.props.className}>{this.props.caption}</button>
		);
	}
}

Button.propTypes = {
	caption: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string,
	onClickArguments: PropTypes.object
};

Button.defaultProps = {
	caption: "",
	onClick: Function.prototype,
	className: "button"
};

export default Button;
