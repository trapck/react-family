import React, {PropTypes} from "react";

const GeneralInfoRow = (props) => {
	const preventFn = e => e.preventDefault();
	return (
		<div>
			<a href = "#" className = "link" onClick = {preventFn}>
				{`${props.title} (${props.count}) ${props.amount}`}
			</a>
		</div>
	);
};

GeneralInfoRow.propTypes = {
	category: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	amount: PropTypes.number.isRequired,
	onHeaderClick: PropTypes.func.isRequired,
	isCollapsed: PropTypes.bool
};

export default GeneralInfoRow;

