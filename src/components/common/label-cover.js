import React, {PropTypes} from "react";

const LabelCover = props => {
	return (
		<div className = "label-cover">
			<div className = {props.isHorizontal ? "label-cover-label-horizontal" : null}>
				{props.caption}
			</div>
			<div className = "label-cover-body">
				{props.children}
			</div>
		</div>
	);
};

LabelCover.propTypes = {
	children: PropTypes.object.isRequired,
	caption: PropTypes.string.isRequired,
	isHorizontal: PropTypes.bool
};

export default LabelCover;
