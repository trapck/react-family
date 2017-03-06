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
	}

	render() {
		return (
			<div>
				<ExpenseCategoriesList/>
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
