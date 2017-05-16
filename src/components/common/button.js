import React, {PropTypes} from "react";

const Button = props => {
	return (<button onClick={props.onClick} className={props.className}>{props.caption}</button>);
};

Button.propTypes = {
	caption: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string
};

Button.defaultProps = {
	caption: "",
	onClick: Function.prototype,
	className: "button"
};

export default Button;
