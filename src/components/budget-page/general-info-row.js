import React, {PropTypes} from "react";

const GeneralInfoRow = (props) => {
	const preventFn = e => e.preventDefault();
	return (
		<div>
			<a href = "#" className = "link" onClick = {preventFn}>
				{`${props.generalInfoRowModel.displayValues.category} ` +
				`(${props.generalInfoRowModel.count}) ${props.generalInfoRowModel.amount}`}
			</a>
		</div>
	);
};

GeneralInfoRow.propTypes = {
	generalInfoRowModel: PropTypes.object.isRequired,
	onHeaderClick: PropTypes.func.isRequired,
	isCollapsed: PropTypes.bool
};

export default GeneralInfoRow;

