import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import ExpenseCategoriesList from "./expense-categories-list";
import NewExpenseCategory from "./new-expense-category";

class ExpenseCategoriesManager extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			toggleNewExpenseCategoryVisible,
			isNewExpenseCategoryVisible
			} = this.props;
		return (
			<div>
				<div>
					<button onClick = {toggleNewExpenseCategoryVisible}>
						{isNewExpenseCategoryVisible ? "-" : "+"}
					</button>
					{isNewExpenseCategoryVisible ? <NewExpenseCategory/> : null}
				</div>
				<ExpenseCategoriesList/>
			</div>
		);
	}
}
ExpenseCategoriesManager.propTypes = {
	isNewExpenseCategoryVisible: PropTypes.bool,
	toggleNewExpenseCategoryVisible: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		isNewExpenseCategoryVisible: state.budget.ui.isNewExpenseCategoryVisible
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCategoriesManager);
