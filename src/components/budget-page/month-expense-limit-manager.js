import React, {PropTypes} from "react";
import MonthExpenseLimitsList from "./month-expense-limits-list";

class MonthExpenseLimitManager extends React.Component{
	constructor(props) {
		super(props);
	}

	render() {
		// implement isShowCurrentMonthOnly checkBox
		const isShowCurrentMonthOnly = false;
		return (
			<MonthExpenseLimitsList isShowCurrentMonthOnly={isShowCurrentMonthOnly}/>
		);
	}
}

export default MonthExpenseLimitManager;
