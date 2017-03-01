import React, {PropTypes} from "react";
import BudgetSettingsNav from "./budget-settings-nav";

const Settings = (props) => {
	return (
		<div>
			<BudgetSettingsNav />
			{props.children}
		</div>
	);
};

Settings.propTypes = {
	children: PropTypes.object
};

export default Settings;
