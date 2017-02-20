import React, {PropTypes} from "react";

const Summary = props =>  {
	let className = "month-expense-summary " + (props.amount > props.income
		? "month-expense-summary-danger"
		: props.amount > props.limit
		? "month-expense-summary-warning"
		: "month-expense-summary-ok");
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
