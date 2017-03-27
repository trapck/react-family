import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PreloaderContainer from "../common/preloader-container";
import DeleteIcon from "../common/delete-icon";
import entityListHelper from "../../helpers/visual-helpers/entity-list-helper";
import * as actionCreators from "../../redux/actions/action-creators";
import Expense from "./expense";
import {getEntityColumnsCaptions, getDateColumnEqualityComparisonResult} from "../../../other/utils";
import toastr from "toastr";
import guid from "uuid/v4";

class ExpensesList extends React.Component {
	constructor(props) {
		super(props);
		this.onExpenseValueUpdated = this.onExpenseValueUpdated.bind(this);
		this.onDeleteExpenseClick = this.onDeleteExpenseClick.bind(this);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		let categoryFilter = {
				column: "category",
				value: this.props.category
			},
			filters = [categoryFilter];
		if (this.props.dateFilterValue) {
			filters.push({
				column: "date",
				value: this.props.dateFilterValue
			});
		}
		this.props.getExpenses(filters, this.isLoadingToken);
		if (this.props.isSyncNeeded) {
			this.props.getCurrentMonthGeneralInfo(
				filters, undefined, (this.props.dateFilterValue || {}).M, (this.props.dateFilterValue || {}).Y
			);
		}
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	onExpenseValueUpdated(id, columnName, columnValue) {
		this.props.updateExpense([
				{
					id,
					values: [
						{
							columnName,
							columnValue
						}
					]
				}
			],
			this.isLoadingToken,
			this.props.currentMonth,
			this.props.currentYear).then(() => {
			toastr.success("Expense updated");
			this.props.removeIsLoading(this.isLoadingToken);
		});
	}

	onDeleteExpenseClick(args) {
		this.props.deleteExpense([{
				column: "id",
				value: args.id
			}],
			this.isLoadingToken,
			this.props.currentMonth,
			this.props.currentYear).then(() => {
			toastr.success("Expense deleted");
			this.props.removeIsLoading(this.isLoadingToken);
		});
	}

	render() {
		const additionalRightCells = [this.props.expenses.map(
			e => <DeleteIcon key = {e.id} onClick = {this.onDeleteExpenseClick} onClickArguments = {{id: e.id}}/>
		)];
		return (
			<div>
				<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
					{
						entityListHelper.createTableList(
							Expense,
							this.props.expenses,
							"expense",
							this.onExpenseValueUpdated,
							additionalRightCells,
							[],
							["id"],
							"expenses-table"
						)
					}
				</PreloaderContainer>
			</div>
		);
	}
}

ExpensesList.propTypes = {
	expenses: PropTypes.array.isRequired,
	getExpenses: PropTypes.func.isRequired,
	updateExpense: PropTypes.func.isRequired,
	deleteExpense: PropTypes.func.isRequired,
	count: PropTypes.number,
	amount: PropTypes.number,
	category: PropTypes.string.isRequired,
	isSyncNeeded: PropTypes.bool,
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired,
	dateFilterValue: PropTypes.object,
	currentMonth: PropTypes.number.isRequired,
	currentYear: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		expenses: state.budget.expenses.filter(e =>
			e.category === ownProps.category &&
			(ownProps.dateFilterValue ?  getDateColumnEqualityComparisonResult(e.date, ownProps.dateFilterValue) : true)
			)
			.sort((a,b) => {
				if (a.title > b.title) return 1;
				else if (b.title > a.title) return -1;
				else return 0;
			})
			.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
		isLoading: state.isLoading,
		currentMonth: state.budget.ui.currentMonth.number,
		currentYear: state.budget.ui.currentYear
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
