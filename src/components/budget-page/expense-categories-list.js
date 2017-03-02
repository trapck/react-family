import React, {PropTypes} from "react";
import ExpenseCategory from "./expense-category";
import {getEntityColumnsCaptions} from "../../../other/utils";

const ExpenseCategoriesList = props => {
	return (
		<div>
			<table className = "expenses-categories-table">
				<tbody>
				<tr>
					{getEntityColumnsCaptions("expenseCategory", ["id"]).map((c, i) => <th key={i}>{c}</th>)}
				</tr>
				{props.expenseCategories.map(c => <ExpenseCategory key={c.id} category={c}/>)}
				</tbody>
			</table>
		</div>
	);
};

ExpenseCategoriesList.propTypes = {
	expenseCategories: PropTypes.array.isRequired
};

export default ExpenseCategoriesList;
