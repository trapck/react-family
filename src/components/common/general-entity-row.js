import React, {PropTypes} from "react";
import {getTextValueByColumnType, getEditValueByColumnType} from "../../../other/utils";
import EditableValue from "../common/editable-value";
import validatorFactory from "../../helpers/form-validators/validator-factory";
import entityStructure from "../../static-data/entity-info/entity-sctructure";

class GeneralEntityRow extends React.Component {
	constructor(props, entityName) {
		super(props);
		this.entityName = entityName;
		this.onBlur = this.onBlur.bind(this);
	}

	onBlur(column, value) {
		this.props.onValueChange(this.props.entity.id, column, value);
	}

	render() {
		return (
			<tr>
				{this.props.additionalLeftCells.map((c, i) => <td key = {i}>{c}</td>)}
				{
					Object.keys(entityStructure[this.entityName].columns)
						.filter(key => !entityStructure[this.entityName].columns[key].isSystem)
						.map(key => {
							return (
								<td key={entityStructure[this.entityName].columns[key].id}>
									<EditableValue
										entity={this.props.entity}
										entityName={this.entityName}
										columnName={key}
										onBlur={this.onBlur}
										value={getEditValueByColumnType(
											this.entityName, key, this.props.entity[key], this.props.entity
										)}
										validator={validatorFactory.getValidator(this.entityName)}
									>
										{getTextValueByColumnType(
											this.entityName, key, this.props.entity[key], this.props.entity)}
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

GeneralEntityRow.propTypes = {
	entity: PropTypes.object.isRequired,
	onValueChange: PropTypes.func,
	additionalLeftCells: PropTypes.array,
	additionalRightCells: PropTypes.array
};

GeneralEntityRow.defaultProps = {
	onValueChange: Function.prototype,
	additionalLeftCells: [],
	additionalRightCells: []
};

export default GeneralEntityRow;
