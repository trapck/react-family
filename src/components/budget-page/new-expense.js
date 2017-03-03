import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/actions/action-creators";
import InputByColumnType from "../common/input-by-column-type";
import PreloaderContainer from "../common/preloader-container";
import entityStructure from "../../static-data/entity-info/entity-sctructure";
import guid from "uuid/v4";
import toastr from "toastr";

class NewExpense extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.saveNewExpense = this.saveNewExpense.bind(this);
		this.isLoadingToken = guid();
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	onChange(column, value, e) {
		this.props.newExpenseChange(column, value, e);
	}

	saveNewExpense() {
		this.props.addNewExpense(this.props.newExpense, this.isLoadingToken)
			.then(() => toastr.success("New expense added"));
	}

	render() {
		return (
				<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
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
				</PreloaderContainer>
		);
	}
}

NewExpense.propTypes = {
	newExpense: PropTypes.object.isRequired,
	newExpenseChange: PropTypes.func.isRequired,
	clearNewExpense: PropTypes.func.isRequired,
	addNewExpense: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		newExpense: state.budget.newExpense,
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewExpense);
