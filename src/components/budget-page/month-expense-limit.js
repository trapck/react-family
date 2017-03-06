import React, {PropTypes} from "react";
import {getTextValueByColumnType, getEditValueByColumnType} from "../../../other/utils";
import EditableValue from "../common/editable-value";
import entityStructure from "../../static-data/entity-info/entity-sctructure";
import entityColumnTypes from "../../static-data/entity-info/entity-column-types";


//TODO: think about generalizing list item components
class MonthExpenseLimit extends React.Component {
	constructor(props) {
		super(props);
		this.onBlur = this.onBlur.bind(this);
	}

	onBlur(column, value) {
		this.props.onValueChange(this.props.monthExpenseLimit.id, column, value);
	}

	render() {
		return (
			<tr>
				{
					Object.keys(entityStructure.monthExpenseLimit.columns)
						.filter(key => !entityStructure.monthExpenseLimit.columns[key].isSystem)
						.map(key => {
							return (
								<td key={entityStructure.monthExpenseLimit.columns[key].id}>
									<EditableValue
										entityName="monthExpenseLimit"
										columnName={key}
										onBlur={this.onBlur}
										value={
										getEditValueByColumnType(
											"monthExpenseLimit",
											key,
											this.props.monthExpenseLimit[key],
											this.props.monthExpenseLimit)
										}
									>
										{
											getTextValueByColumnType(
												"monthExpenseLimit",
												key,
												this.props.monthExpenseLimit[key],
												this.props.monthExpenseLimit)
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

MonthExpenseLimit.propTypes = {
	monthExpenseLimit: PropTypes.object.isRequired,
	onValueChange: PropTypes.func
};

MonthExpenseLimit.defaultProps = {
	onValueChange: Function.prototype
};

export default MonthExpenseLimit;
