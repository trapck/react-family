import React, {PropTypes} from "react";

const ExpenseCategory = props => {
	return (
		<tr>
			<td>{props.category.title}</td>
			<td>
				<input
					type = "checkbox"
					disabled
					checked = {!!props.category.isNotVisibleInList}
				/>
			</td>
		</tr>
	);
};

ExpenseCategory.propTypes = {
	category: PropTypes.object.isRequired
};

export default ExpenseCategory;
