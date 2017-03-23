import React, {PropTypes} from "react";

const ValidationInfo = (props) => {
	return (
		<div className = "validation-info-container">
			{props.message}
		</div>
	);
};

ValidationInfo.propTypes = {
	message: PropTypes.string
};

ValidationInfo.defaultProps = {
	message: ""
};
export default ValidationInfo;
