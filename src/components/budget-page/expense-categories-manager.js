import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import PreloaderContainer from "../common/preloader-container";
import ExpenseCategoriesList from "./expense-categories-list";
import NewExpenseCategory from "./new-expense-category";
import guid from "uuid/v4";

class ExpenseCategoriesManager extends React.Component {
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		this.props.getExpenseCategories(undefined, this.isLoadingToken);
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	render() {
		return (
			<div>
				<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
					<ExpenseCategoriesList expenseCategories = {this.props.expenseCategories}/>
				</PreloaderContainer>
				<div>
					<button onClick = {this.props.toggleNewExpenseCategoryVisible}>
						{this.props.isNewExpenseCategoryVisible ? "-" : "+"}
					</button>
					{this.props.isNewExpenseCategoryVisible ? <NewExpenseCategory/> : null}
				</div>
			</div>
		);
	}
}
ExpenseCategoriesManager.propTypes = {
	expenseCategories: PropTypes.array.isRequired,
	getExpenseCategories: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired,
	isNewExpenseCategoryVisible: PropTypes.bool,
	toggleNewExpenseCategoryVisible: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		expenseCategories: state.budget.expenseCategories,
		isNewExpenseCategoryVisible: state.budget.ui.isNewExpenseCategoryVisible
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCategoriesManager);
