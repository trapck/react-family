import React, {PropTypes} from "react";
import Button from "../common/button";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import NewExpenseComment from "./new-expense-comment";
import ExpenseCommentsList from "./expense-comments-list";
import PreloaderContainer from "../common/preloader-container";
import guid from "uuid/v4";

class ExpenseCommentsPage extends React.Component {
	constructor(props) {
		super(props);
		this.updateExpenseComment = this.updateExpenseComment.bind(this);
		this.deleteExpenseComment = this.deleteExpenseComment.bind(this);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		this.props.getExpenseComments([{
			column: "expense",
			value: this.props.expense
		}], this.isLoadingToken);
	}

	componentWillUnmount() {
		this.props.removeIsLoading({isLoadingToken: this.isLoadingToken});
	}
	// TODO: make base component for budget-main, expense-comments-page etc.

	updateExpenseComment() {
		this.props.updateExpenseComment(arguments)
			.then(() => this.props.removeIsLoading({isLoadingToken: this.isLoadingToken}));
	}

	deleteExpenseComment() {
		this.props.deleteExpenseComment(arguments)
			.then(() => this.props.removeIsLoading({isLoadingToken: this.isLoadingToken}));
	}

	render() {
		return (
			<div>
				<Button caption="Close" onClick={this.props.onClose}/>
				<NewExpenseComment expense={this.props.expense}/>
				<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
					<ExpenseCommentsList
						comments={this.props.comments}
						updateExpenseComment={this.props.updateExpenseComment}
						deleteExpenseComment={this.props.deleteExpenseComment}
						isLoadingToken={this.isLoadingToken}
					/>
				</PreloaderContainer>
			</div>
		);
	}
}

ExpenseCommentsPage.propTypes = {
	expense: PropTypes.string.isRequired,
	onClose: PropTypes.func.isRequired,
	comments: PropTypes.array.isRequired,
	getExpenseComments: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	updateExpenseComment: PropTypes.func.isRequired,
	deleteExpenseComment: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		comments: state.budget.expenseComments
			.filter(ec => ec.expense === ownProps.expense)
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCommentsPage);
