import React, {PropTypes} from "react";
import classNames from "classnames";

const Summary = props =>  {
	const amount = props.amount,
		income = props.income,
		limit = props.limit,
		className = classNames(
		"month-expense-summary",
		{
			["month-expense-summary-ok"]: amount <= limit,
			["month-expense-summary-warning"]: amount > limit && amount <= income,
			["month-expense-summary-danger"]: amount > income
		}
	);
	return (
		<div className = {className}>
			{`Total count: ${props.count}. Total amount: ${props.amount}`}
		</div>
	);
};

Summary.propTypes = {
	count: PropTypes.number.isRequired,
	amount: PropTypes.number.isRequired,
	income: PropTypes.number.isRequired,
	limit: PropTypes.number.isRequired
};

export default Summary;
