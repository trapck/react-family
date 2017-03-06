import React, {PropTypes} from "react";
import {getTextValueByColumnType, getEditValueByColumnType} from "../../../other/utils";
import EditableValue from "../common/editable-value";
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
		return (
			<tr>
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
			</tr>
		);
	}
}

ExpenseCategory.propTypes = {
	expenseCategory: PropTypes.object.isRequired,
	onValueChange: PropTypes.func
};

ExpenseCategory.defaultProps = {
	onValueChange: Function.prototype
};

export default ExpenseCategory;
