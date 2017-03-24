import React, {PropTypes} from "react";
import {getTextValueByColumnType, getEditValueByColumnType} from "../../../other/utils";
import EditableValue from "../common/editable-value";
import validator from "../../helpers/form-validators/expense-category-validator";
import entityStructure from "../../static-data/entity-info/entity-sctructure";
import entityColumnTypes from "../../static-data/entity-info/entity-column-types";


//TODO: think about generalizing list item components
class ExpenseCategory extends React.Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
	}

	onBlur(column, value) {
		this.props.onValueChange(this.props.expenseCategory.id, column, value);
	}

	render() {
		// TODO: implement general way for entity row and additional cells
		return (
			<tr>
				{this.props.additionalLeftCells.map((c, i) => <td key = {i}>{c}</td>)}
				{
					Object.keys(entityStructure.expenseCategory.columns)
						.filter(key => !entityStructure.expenseCategory.columns[key].isSystem)
						.map(key => {
							return (
								<td key={entityStructure.expenseCategory.columns[key].id}>
									<EditableValue
										entityName="expenseCategory"
										columnName={key}
										onBlur={this.onBlur}
										value={
										getEditValueByColumnType(
											"expenseCategory",
											key,
											this.props.expenseCategory[key],
											this.props.expenseCategory)
										}
										validator={validator}
									>
										{
											getTextValueByColumnType(
												"expenseCategory",
												key,
												this.props.expenseCategory[key],
												this.props.expenseCategory)
										}
									</EditableValue>
								</td>
							);
						})
				}
				{this.props.additionalRightCells.map((c, i) => <td key = {i}>{c}</td>)}
			</tr>
		);
	}
}

ExpenseCategory.propTypes = {
	expenseCategory: PropTypes.object.isRequired,
	onValueChange: PropTypes.func,
	additionalLeftCells: PropTypes.array,
	additionalRightCells: PropTypes.array
};

ExpenseCategory.defaultProps = {
	onValueChange: Function.prototype,
	additionalLeftCells: [],
	additionalRightCells: []
};

export default ExpenseCategory;
