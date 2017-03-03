import React, {PropTypes} from "react";

const Preloader = (props) => {
	return (
		<div>{props.message}</div>
	);
};

Preloader.propTypes = {
	message: PropTypes.string
};

Preloader.defaultProps = {
	message: "Loading ..."
};

export default Preloader;
