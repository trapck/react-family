import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/actions/action-creators";
import InputByColumnType from "../common/input-by-column-type";
import entityStructure from "../../static-data/entity-info/entity-sctructure";

class NewExpense extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.saveNewExpense = this.saveNewExpense.bind(this);
	}

	onChange(column, value, e) {
		this.props.newExpenseChange(column, value, e);
	}

	saveNewExpense() {
		this.props.addNewExpense(this.props.newExpense);
	}

	render() {
		return (
			<div>
				<button onClick = {this.saveNewExpense}>Save</button>
				<button onClick = {this.props.clearNewExpense}>Clear</button>
				<div>
					{
						Object.keys(entityStructure.expense.columns)
							.filter(c => !entityStructure.expense.columns[c].isSystem)
							.map(
								c => <InputByColumnType
									key = {c}
									entityName = "expense"
									columnName = {c}
									value = {this.props.newExpense[c]}
									onChange = {this.onChange}
								/>
							)
					}
				</div>
			</div>
		);
	}
}

NewExpense.propTypes = {
	newExpense: PropTypes.object.isRequired,
	newExpenseChange: PropTypes.func.isRequired,
	clearNewExpense: PropTypes.func.isRequired,
	addNewExpense: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		newExpense: state.budget.newExpense
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
