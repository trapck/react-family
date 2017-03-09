import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PreloaderContainer from "../common/preloader-container";
import DeleteIcon from "../common/delete-icon";
import * as actionCreators from "../../redux/actions/action-creators";
import ExpenseCategory from "./expense-category";
import {getEntityColumnsCaptions} from "../../../other/utils";
import toastr from "toastr";
import guid from "uuid/v4";


//TODO: think about generalizing list components
class ExpenseCategoriesList extends React.Component {
	constructor(props) {
		super(props);
		this.onCategoryValueUpdated = this.onCategoryValueUpdated.bind(this);
		this.onDeleteExpenseCategoryClick = this.onDeleteExpenseCategoryClick.bind(this);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		this.props.getExpenseCategories(undefined, this.isLoadingToken);
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	onCategoryValueUpdated(id, columnName, columnValue) {
		this.props.updateExpenseCategory([
			{
				id,
				values: [
					{
						columnName,
						columnValue
					}
				]
			}
		], this.isLoadingToken).then(() => {
			toastr.success("Category updated");
			this.props.removeIsLoading(this.isLoadingToken);
		});
	}

	onDeleteExpenseCategoryClick(args) {
		this.props.deleteExpenseCategory([{
			column: "id",
			value: args.id
		}], this.isLoadingToken).then(() => {
			toastr.success("Expense category deleted");
			this.props.removeIsLoading(this.isLoadingToken);
		},
			() => toastr.error("Something went wrong"));
	}

	render() {
		return (
			<div>
				<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
					<table className = "expense-categories-table">
						<tbody>
						<tr>
							{getEntityColumnsCaptions("expenseCategory", ["id"]).map((c, i) => <th key={i}>{c}</th>)}
						</tr>
						{
							this.props.expenseCategories.map(e => {
								const additionalRightCells = [
									<DeleteIcon
										key = {e.id}
										onClick = {this.onDeleteExpenseCategoryClick}
										onClickArguments = {{id: e.id}}
									/>
								];
								return (
									<ExpenseCategory
										key={e.id}
										expenseCategory={e}
										onValueChange={this.onCategoryValueUpdated}
										additionalRightCells={additionalRightCells}
									/>
								);
							})
						}
						</tbody>
					</table>
				</PreloaderContainer>
			</div>
		);
	}
}

ExpenseCategoriesList.propTypes = {
	expenseCategories: PropTypes.array.isRequired,
	getExpenseCategories: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired,
	updateExpenseCategory: PropTypes.func.isRequired,
	deleteExpenseCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		isLoading: state.isLoading,
		expenseCategories: state.budget.expenseCategories.slice().sort((a, b) => {
			if (a.title < b.title) return -1;
			else if (b.title < a.title) return 1;
			else return 0;
		})
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCategoriesList);
