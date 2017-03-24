import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/actions/action-creators";
import InputByColumnType from "../common/input-by-column-type";
import PreloaderContainer from "../common/preloader-container";
import entityStructure from "../../static-data/entity-info/entity-sctructure";
import validator from "../../helpers/form-validators/expense-category-validator";
import guid from "uuid/v4";
import toastr from "toastr";

class NewExpenseCategory extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.saveNewExpenseCategory = this.saveNewExpenseCategory.bind(this);
		this.isLoadingToken = guid();
		this.state = {
			validationInfo: []
		}
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	componentDidMount() {
		this.refs.title.refs.title.refs.input.focus();
	}

	onChange(column, value, e) {
		this.props.newExpenseCategoryChange(column, value, e);
	}

	saveNewExpenseCategory() {
		const validationResult = validator.validate(this.props.newExpenseCategory);
		if (validationResult.length) {
			this.setState(Object.assign({}, this.state, {validationInfo: [...validationResult]}));
			return;
		}
		if (this.state.validationInfo.length) {
			this.setState(Object.assign({}, this.state, {validationInfo: []}));
		}
		this.props.addNewExpenseCategory(this.props.newExpenseCategory, this.isLoadingToken)
			.then(() => toastr.success("New expense category added"));
	}

	render() {
		return (
			<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
				<div>
					<button onClick = {this.saveNewExpenseCategory}>Save</button>
					<button onClick = {this.props.clearNewExpenseCategory}>Clear</button>
					<div>
						{
							Object.keys(entityStructure.expenseCategory.columns)
								.filter(c => !entityStructure.expenseCategory.columns[c].isSystem)
								.map(
									c => <InputByColumnType
										ref = {c}
										key = {c}
										entityName = "expenseCategory"
										columnName = {c}
										value = {this.props.newExpenseCategory[c]}
										onChange = {this.onChange}
										validationMessage = {
												this.state.validationInfo.filter(i => i.name === c).map(i => i.message)[0] || ""
											}
									/>
								)
						}
					</div>
				</div>
			</PreloaderContainer>
		);
	}
}

NewExpenseCategory.propTypes = {
	newExpenseCategory: PropTypes.object.isRequired,
	newExpenseCategoryChange: PropTypes.func.isRequired,
	clearNewExpenseCategory: PropTypes.func.isRequired,
	addNewExpenseCategory: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		newExpenseCategory: state.budget.newExpenseCategory,
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewExpenseCategory);
