import React, {PropTypes} from "react";
import Header from "./budget-header";

const BudgetPage = props => {
	return (
		<div>
			<Header/>
			{props.children}
		</div>
	);
};

BudgetPage.propTypes = {
	children: PropTypes.object.isRequired
};

export default BudgetPage;
