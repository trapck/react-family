import React, {PropTypes} from "react";
import InputByColumnType from "./input-by-column-type";
import {getValueByColumnType} from "../../../other/utils";
import entityStructure from "../../static-data/entity-info/entity-sctructure";

class EditableValue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditMode: false,
			editValue: this.props.value,
			validationMessage: ""
		};
		this.onLabelClick = this.onLabelClick.bind(this);
		this.onEditChange = this.onEditChange.bind(this);
		this.onEditBlur = this.onEditBlur.bind(this);
	}

	onLabelClick() {
		if (!entityStructure[this.props.entityName].columns[this.props.columnName].isEditDisabled) {
			this.setState(Object.assign({}, this.state, {isEditMode: true}));
		}
	}

	getEditComponent() {
		return (
			<div onBlur = {this.onEditBlur}>
				<InputByColumnType
					entityName = {this.props.entityName}
					columnName = {this.props.columnName}
					value = {this.state.editValue}
					onChange = {this.onEditChange}
					validationMessage = {this.state.validationMessage}
					isLabelHidden
				/>
			</div>
		);
	}

	onEditChange(column, value, e) {
		this.setState(Object.assign({}, this.state, {editValue: value}));
	}

	notifyParentIfValueChanged() {
		let oldValue = getValueByColumnType(this.props.entityName, this.props.columnName, this.props.value),
			newValue = getValueByColumnType(this.props.entityName, this.props.columnName, this.state.editValue);
		oldValue = oldValue && oldValue.getTime ? oldValue.getTime() : oldValue;
		newValue = newValue && newValue.getTime ? newValue.getTime() : newValue;
		if (oldValue !== newValue) {
			this.props.onBlur(this.props.columnName, this.state.editValue);
		}
		this.setState(Object.assign({}, this.state, {isEditMode: false}));
	}

	onEditBlur(column, value, e) {
		if (this.props.validator) {
			const validationResult = this.props.validator.validateColumn(
				this.props.columnName, this.state.editValue, this.props.entity
			);
			if (!validationResult.success) {
				this.setState(Object.assign({}, this.state, {validationMessage: validationResult.message}));
				return;
			} else {
				this.setState(Object.assign({}, this.state, {validationMessage: "", isEditMode: false}));
			}
		}
		//this.setState(Object.assign({}, this.state, {isEditMode: false}));
		this.notifyParentIfValueChanged();
	}

	getLabelComponent() {
		return (
			<div onClick = {this.onLabelClick} style={{width: "inherit", minHeight: "1em"}}>
				{this.props.children}
			</div>
		);
	}

	render() {
		return this.state.isEditMode ? this.getEditComponent() : this.getLabelComponent();
	}
}

EditableValue.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]).isRequired,
	entityName: PropTypes.string.isRequired,
	columnName: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool, PropTypes.number]),
	onBlur: PropTypes.func,
	validator: PropTypes.object,
	validationMessage: PropTypes.string,
	entity: PropTypes.object
};

EditableValue.defaultProps = {
	onBlur: Function.prototype,
	children: "",
	validationMessage: ""
};
export default EditableValue;
