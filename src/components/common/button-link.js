import React, {PropTypes} from "react";

const ButtonLink = props => {
	const onClick = e => {
		e.preventDefault();
		e.stopPropagation();
		props.onClick();
	};
	return (<a href="#" onClick={onClick} className={props.className}>{props.caption}</a>);
};

ButtonLink.propTypes = {
	caption: PropTypes.string,
	onClick: PropTypes.func,
	className: PropTypes.string
};

ButtonLink.defaultProps = {
	caption: "",
	onClick: Function.prototype,
	className: "button-link"
};

export default ButtonLink;
