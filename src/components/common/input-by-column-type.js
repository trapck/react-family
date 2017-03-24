import React, {PropTypes} from "react";
import entityStructure from "../../static-data/entity-info/entity-sctructure";
import entityColumnTypes from "../../static-data/entity-info/entity-column-types";
import LabelCover from "./label-cover";
import TextInput from "./text-input";
import NumberInput from "./number-input";
import DateInput from "./date-input";
import DropDownInput from "./dropdown-input";
import TextAreaInput from "./text-area-input";
import BooleanInput from "./boolean-input";
import ValidationInfo from "./validation-info";
import mockApi from "../../../other/mock-api";

class InputByColumnType extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lookupInfo: {}
		};
	}

	componentWillMount() {
		const column = entityStructure[this.props.entityName].columns[this.props.columnName];
		if (column.type === entityColumnTypes.LOOKUP) {
			mockApi.getDropDownList(column, this.props.lookupInfo.filters, this.props.lookupInfo.includeColumns).then(
				list => {
					if (!this.isUnmount) {
						this.setState(Object.assign({}, this.state, {
							lookupInfo: Object.assign({}, this.state.lookupInfo, {
								options: list
							})
						}));
					}
				}
			);
		}
	}


	componentWillUnmount() {
		this.isUnmount = true;
	}

	getTextInput(column) {
		return column.isMultiLine ? <TextAreaInput/> : <TextInput/>;
	}

	getDateInput(column) {
		return <DateInput/>;
	}

	getNumberInput(column) {
		return <NumberInput isInteger = {column.isInteger} isNegativeAllowed = {column.isNegativeAllowed}/>;
	}

	getDropDownInput(column) {
		return (
			<DropDownInput
				options = {this.state.lookupInfo.options}
			/>
		);
	}

	getBooleanInput(column) {
		return <BooleanInput/>;
	}

	getComponent(column) {
		switch (column.type) {
			case entityColumnTypes.STRING:
				return this.getTextInput(column);
			case entityColumnTypes.NUMBER:
				return this.getNumberInput(column);
			case entityColumnTypes.DATE:
				return this.getDateInput(column);
			case entityColumnTypes.LOOKUP:
				return this.getDropDownInput(column);
			case entityColumnTypes.BOOLEAN:
				return this.getBooleanInput(column);
			default:
				return this.getTextInput(column);
		}
	}

	render() {
		const column = entityStructure[this.props.entityName].columns[this.props.columnName];
		return (
			<div>
				{
					React.createElement(
						this.props.isLabelHidden ? "div" : LabelCover,
						this.props.isLabelHidden ? undefined : {caption: column.caption},
						React.cloneElement(this.getComponent(column), {
							ref: this.props.columnName,
							value: this.props.value,
							onChange: this.props.onChange,
							onBlur: this.props.onBlur,
							tag: this.props.columnName
						}))
				}
				<ValidationInfo message = {this.props.validationMessage}/>
			</div>
		)
	}
}

InputByColumnType.propTypes = {
	entityName: PropTypes.string.isRequired,
	columnName: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool, PropTypes.number]),
	onChange: PropTypes.func.isRequired,
	onBlur: PropTypes.func.isRequired,
	lookupInfo: PropTypes.object,
	isLabelHidden: PropTypes.bool,
	validationMessage: PropTypes.string
};

InputByColumnType.defaultProps = {
	lookupInfo: {},
	onBlur: Function.prototype,
	validationMessage: ""
};


export default InputByColumnType;
