import React from "react";
import Header from "./header";

const BudgetPage = (props) => {
	return (
		<div>
			<Header/>
			{props.children}
		</div>
	);
};

export default BudgetPage;
