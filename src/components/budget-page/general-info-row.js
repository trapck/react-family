import React, {PropTypes} from "react";

const GeneralInfoRow = (props) => {
	return (
		<div>
			<div className = "link">
				{`${props.generalInfoRowModel.displayValues.category} ` +
				`(${props.generalInfoRowModel.count}) ${props.generalInfoRowModel.amount}`}
			</div>
		</div>
	);
};

GeneralInfoRow.propTypes = {
	generalInfoRowModel: PropTypes.object.isRequired,
	onHeaderClick: PropTypes.func.isRequired,
	isCollapsed: PropTypes.bool
};

export default GeneralInfoRow;

