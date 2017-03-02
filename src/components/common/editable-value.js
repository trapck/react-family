import React, {PropTypes} from "react";
import InputByColumnType from "./input-by-column-type";

class EditableValue extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEditMode: false,
			editValue: this.props.value
		};
		this.onLabelClick = this.onLabelClick.bind(this);
		this.onEditChange = this.onEditChange.bind(this);
		this.onEditBlur = this.onEditBlur.bind(this);
	}

	onLabelClick() {
		this.setState(Object.assign({}, this.state, {isEditMode: true}));
	}

	getEditComponent() {
		return (
			<div>
				<InputByColumnType
					entityName = {this.props.entityName}
					columnName = {this.props.columnName}
					value = {this.state.editValue}
					onChange = {this.onEditChange}
					onBlur = {this.onEditBlur}
					isLabelHidden
				/>
			</div>
		);
	}

	onEditChange(column, value, e) {
		this.setState(Object.assign({}, this.state, {editValue: value}));
	}

	onEditBlur(column, value, e) {
		this.setState(Object.assign({}, this.state, {isEditMode: false}));
	}

	getLabelComponent() {
		return (
			<div onClick = {this.onLabelClick}>
				{this.props.children}
			</div>
		);
	}

	render() {
		// TODO: autoFocus on input render
		return this.state.isEditMode ? this.getEditComponent() : this.getLabelComponent();
	}
}

EditableValue.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]).isRequired,
	entityName: PropTypes.string.isRequired,
	columnName: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.bool, PropTypes.number]),
	onBlur: PropTypes.func
};

EditableValue.defaultProps = {
	onBlur: Function.prototype
};
export default EditableValue;
