import React, {PropTypes} from "react";
import {Link} from "react-router";

const BudgetSettingsNav = () => {
	return (
		<div className = "budget-settings-nav">
			<Link to = "/budget/settings/categories" className = "link" activeClassName = "link_active">Categories</Link>
			<br/>
			<Link to = "/budget/settings/limits" className = "link" activeClassName = "link_active">Month limit</Link>
		</div>
	);
};
export default BudgetSettingsNav;
