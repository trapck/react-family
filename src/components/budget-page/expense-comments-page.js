import React, {PropTypes} from "react";
import Button from "../common/button";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import NewExpenseComment from "./new-expense-comment";
import guid from "uuid/v4";

class ExpenseCommentsPage extends React.Component {
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		this.props.getExpenseComments([{
			column: "expense",
			value: this.props.expense
		}], this.isLoadingToken);
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}
	// TODO: make base component for budget-main, expense-comments-page etc.


	render() {
		return (
			<div>
				<Button caption="Close" onClick={this.props.onClose}/>
				<NewExpenseComment expense={this.props.expense}/>
				<div>{this.props.comments.map((c, i) => <div key={i}>{c.text}</div>)}</div>
			</div>
		);
	}
}

ExpenseCommentsPage.propTypes = {
	expense: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	comments: PropTypes.array.isRequired,
	getExpenseComments: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		comments: state.budget.expenseComments
			.filter(ec => ec.expense === ownProps.expense)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCommentsPage);
