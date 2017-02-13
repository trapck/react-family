import React, {PropTypes} from "react";
import Expense from "./expense";
import babelPolyfill from "babel-polyfill";
import {getEntityColumnsCaptions} from "../../../other/utils";

const ExpensesList = (props) => {
	return (
		<table>
			<tbody>
			<tr>
				{getEntityColumnsCaptions("expense").map(c => <th key = {c}>{c}</th>)}
			</tr>
			{props.expenses.map(e => <Expense
				key = {e.id}
				id = {e.id}
				title = {e.title}
				category = {e.category}
				amount = {e.amount}
				date = {e.date}
				author = {e.author}
				description = {e.description}/>)}
			</tbody>
		</table>
	);
};

ExpensesList.propTypes = {
	expenses: PropTypes.array.isRequired
};

export default ExpensesList;
