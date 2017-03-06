import React, {PropTypes} from "react";

const DeleteIcon = props => {
	const onClick = () => props.onClick(props.onClickArguments);
	return (
		<div className = {props.className} onClick = {onClick}>X</div>
	);
};

DeleteIcon.propTypes = {
	onClick: PropTypes.func,
	className: PropTypes.string,
	onClickArguments: PropTypes.object
};

DeleteIcon.defaultProps = {
	onClick: Function.prototype,
	className: "delete-icon"
};

export default DeleteIcon;
