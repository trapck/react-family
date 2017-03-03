import React, {PropTypes} from "react";
import {getFormatedDate, getTextValueByColumnType, getEditValueByColumnType} from "../../../other/utils";
import EditableValue from "../common/editable-value";
import entityStructure from "../../static-data/entity-info/entity-sctructure";
import entityColumnTypes from "../../static-data/entity-info/entity-column-types";

class Expense extends React.Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
	}

	onBlur(column, value) {
		// TODO: implement isLoading
		this.props.onExpenseValueChange(this.props.expense.id, column, value);
	}

	render() {
		return (
			<tr>
				{
					Object.keys(entityStructure.expense.columns)
						.filter(key => !entityStructure.expense.columns[key].isSystem)
						.map(key => {
							return (
								<td key={entityStructure.expense.columns[key].id}>
									<EditableValue
										entityName="expense"
										columnName={key}
										onBlur={this.onBlur}
										value={getEditValueByColumnType("expense", key, this.props.expense[key], this.props.expense)}
									>
										{getTextValueByColumnType("expense", key, this.props.expense[key], this.props.expense)}
									</EditableValue>
								</td>
							);
						})
				}
			</tr>
		);
	}
}

Expense.propTypes = {
	expense: PropTypes.object.isRequired,
	onExpenseValueChange: PropTypes.func
};

Expense.defaultProps = {
	onExpenseValueChange: Function.prototype
};

export default Expense;
