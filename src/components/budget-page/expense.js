import React, {PropTypes} from "react";
import {getFormatedDate} from "../../../other/utils";

const Expense = (props) => {
	return (
		<tr>
			<td>{props.title}</td>
			<td>{props.category}</td>
			<td>{props.amount}</td>
			<td>{getFormatedDate(props.date)}</td>
			<td>{props.author}</td>
			<td>{props.description}</td>
		</tr>
	);
};

Expense.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	category: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	date: PropTypes.object.isRequired,
	author: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
};

export default Expense;
