import React, {PropTypes} from "react";
import MonthExpenseLimitsList from "./month-expense-limits-list";

class MonthExpenseLimitManager extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MonthExpenseLimitsList/>
		);
	}
}

export default MonthExpenseLimitManager;
