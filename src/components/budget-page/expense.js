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
		this.props.onValueChange(this.props.expense.id, column, value);
	}

	render() {
		return (
			<tr>
				{this.props.additionalLeftCells.map((c, i) => <td key = {i}>{c}</td>)}
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
				{this.props.additionalRightCells.map((c, i) => <td key = {i}>{c}</td>)}
			</tr>
		);
	}
}

Expense.propTypes = {
	expense: PropTypes.object.isRequired,
	onValueChange: PropTypes.func,
	additionalLeftCells: PropTypes.array,
	additionalRightCells: PropTypes.array
};

Expense.defaultProps = {
	onValueChange: Function.prototype,
	additionalLeftCells: [],
	additionalRightCells: []
};

export default Expense;
