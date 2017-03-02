import React, {PropTypes} from "react";
import {getFormatedDate} from "../../../other/utils";
import EditableValue from "../common/editable-value";

const Expense = (props) => {
	return (
		<tr>
			<td>
				<EditableValue entityName = "expense" columnName ="title" value = {props.expense.title}>
					{props.expense.title}
				</EditableValue>
			</td>
			<td>
				<EditableValue
					entityName = "expense"
					columnName ="category"
					value = {{value: props.expense.category, label: props.expense.displayValues.category}}
				>
					{props.expense.displayValues.category}
				</EditableValue>
			</td>
			<td>
				<EditableValue entityName = "expense" columnName ="amount" value = {props.expense.amount}>
					{props.expense.amount.toFixed(2)}
				</EditableValue>
			</td>
			<td>
				<EditableValue entityName = "expense" columnName ="date" value = {props.expense.date}>
					{getFormatedDate(props.expense.date)}
				</EditableValue>
			</td>
			<td>
				<EditableValue
					entityName = "expense"
					columnName ="author"
					value = {{value: props.expense.author, label: props.expense.displayValues.author}}
				>
					{props.expense.displayValues.author}
				</EditableValue>
			</td>
			<td>
				<EditableValue entityName = "expense" columnName ="description" value = {props.expense.description}>
					{props.expense.description}
				</EditableValue>
			</td>
		</tr>
	);
};

Expense.propTypes = {
	expense: PropTypes.object.isRequired
};

export default Expense;
