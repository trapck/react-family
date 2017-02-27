import React, {PropTypes} from "react";
import {getFormatedDate} from "../../../other/utils";

const Expense = (props) => {
	return (
		<tr>
			<td>{props.expense.title}</td>
			<td>{props.expense.displayValues.category}</td>
			<td>{props.expense.amount.toFixed(2)}</td>
			<td>{getFormatedDate(props.expense.date)}</td>
			<td>{props.expense.displayValues.author}</td>
			<td>{props.expense.description}</td>
		</tr>
	);
};

Expense.propTypes = {
	expense: PropTypes.object.isRequired
};

export default Expense;
