import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/actions/action-creators";
import InputByColumnType from "../common/input-by-column-type";
import Button from "../common/button";
import PreloaderContainer from "../common/preloader-container";
import entityStructure from "../../static-data/entity-info/entity-sctructure";
import validator from "../../helpers/form-validators/expense-comment-validator";
import guid from "uuid/v4";
import toastr from "toastr";

//TODO: make base component for new-expense, new expense-comment etc.
class NewExpenseComment extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.saveNewExpenseComment = this.saveNewExpenseComment.bind(this);
		this.isLoadingToken = guid();
		this.state = {
			validationInfo: []
		};
	}

	componentWillUnmount() {
		this.props.removeIsLoading({isLoadingToken: this.isLoadingToken});
		this.props.clearNewExpenseComment();
	}

	onChange(column, value, e) {
		this.props.newExpenseCommentChange({column, value, e});
	}

	saveNewExpenseComment() {
		const validationResult = validator.validate(this.props.newExpenseComment);
		if (validationResult.length) {
			this.setState(Object.assign({}, this.state, {validationInfo: [...validationResult]}));
			return;
		}
		if (this.state.validationInfo.length) {
			this.setState(Object.assign({}, this.state, {validationInfo: []}));
		}
		const newComment= Object.assign({}, this.props.newExpenseComment, {
			expense: this.props.expense,
			author: (this.props.currentUser || {}).id || "",
			date: new Date()
		});
		this.props.addNewExpenseComment({expenseComment: newComment, isLoadingToken: this.isLoadingToken})
			.then(() => toastr.success("New expense comment added"))
			.then(() => this.props.removeIsLoading({isLoadingToken: this.isLoadingToken}));
	}

	render() {
		return (
			<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
				<div>
					<Button onClick={this.saveNewExpenseComment} caption="Save" />
					<Button onClick={this.props.clearNewExpenseComment} caption="Clear"/>
					<div>
						{
							Object.keys(entityStructure.expenseComment.columns)
								.filter(c =>
									!entityStructure.expenseComment.columns[c].isSystem &&
									!entityStructure.expenseComment.columns[c].isHiddenInForm)
								.map(
									c => <InputByColumnType
										key = {c}
										entityName = "expenseComment"
										columnName = {c}
										value = {this.props.newExpenseComment[c]}
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

NewExpenseComment.propTypes = {
	newExpenseComment: PropTypes.object.isRequired,
	newExpenseCommentChange: PropTypes.func.isRequired,
	clearNewExpenseComment: PropTypes.func.isRequired,
	addNewExpenseComment: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	expense: PropTypes.string.isRequired
};

const mapStateToProps = state => {
	return {
		newExpenseComment: state.budget.newExpenseComment,
		currentUser: state.currentUser,
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NewExpenseComment);
