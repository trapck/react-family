import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PreloaderContainer from "../common/preloader-container";
import DeleteIcon from "../common/delete-icon";
import ButtonLink from "../common/button-link";
import ModalWindow from "../common/modal-window";
import entityListHelper from "../../helpers/visual-helpers/entity-list-helper";
import * as actionCreators from "../../redux/actions/action-creators";
import Expense from "./expense";
import ExpenseCommentsPage from "./expense-comments-page";
import {getDateColumnEqualityComparisonResult} from "../../../other/utils"; // TODO: you can use absolute path: https://webpack.github.io/docs/resolving.html
import toastr from "toastr";
import guid from "uuid/v4";

class ExpensesList extends React.Component {
	constructor(props) {
		super(props);
		this.onExpenseValueUpdated = this.onExpenseValueUpdated.bind(this);
		this.onDeleteExpenseClick = this.onDeleteExpenseClick.bind(this);
		this.toggleModalWindowState = this.toggleModalWindowState.bind(this);
		this.isLoadingToken = guid();
		this.state = {
			isModalOpened: false,
			selectedExpense: "",
			preloadedComments: null
		};
	}

	componentWillMount() {
		this.getExpenses(this.props);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.dateFilterValue
			&& this.props.dateFilterValue
			&& nextProps.dateFilterValue.M === this.props.dateFilterValue.M
			&& nextProps.dateFilterValue.Y === this.props.dateFilterValue.Y) {
			return;
		}
		this.getExpenses(nextProps);
	}

	componentWillUnmount() {
		this.props.removeIsLoading({isLoadingToken: this.isLoadingToken});
	}

	getExpenses(props) {
		let categoryFilter = {
				column: "category",
				value: props.category
			},
			filters = [categoryFilter];
		if (props.dateFilterValue) {
			filters.push({
				column: "date",
				value: props.dateFilterValue
			});
		}
		props.getExpenses({filters, isLoadingToken: this.isLoadingToken, includeCommentsCount: true});
		if (props.isSyncNeeded) {
			props.getCurrentMonthGeneralInfo({
					filters,
					currentMonth: (props.dateFilterValue || {}).M,
					currentYear: (props.dateFilterValue || {}).Y
				}
			);
		}
	}

	onExpenseValueUpdated(id, columnName, columnValue) {
		this.props.updateExpense({
			updateMap: [
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
			isLoadingToken: this.isLoadingToken,
			currentMonth: this.props.currentMonth,
			currentYear: this.props.currentYear}).then(() => {
			toastr.success("Expense updated");
			this.props.removeIsLoading({isLoadingToken: this.isLoadingToken});
		});
	}

	onDeleteExpenseClick(args) {
		this.props.deleteExpense({
			filters: [{
				column: "id",
				value: args.id
			}],
			isLoadingToken: this.isLoadingToken,
			currentMonth: this.props.currentMonth,
			currentYear: this.props.currentYear
		}).then(() => {
			toastr.success("Expense deleted");
			this.props.removeIsLoading({isLoadingToken: this.isLoadingToken});
		});
	}

	toggleModalWindowState(args) {
		const isOpened = !this.state.isModalOpened;
		this.setState(Object.assign({}, this.state, {
			isModalOpened: isOpened,
			selectedExpense: !isOpened ? null : args.expense,
			preloadedComments: !isOpened ? null : args.expenseComments
		}));
		if (!isOpened) {
			this.getExpenses(this.props);
		}
	}

	render() {
		const additionalRightCells = [
			this.props.expenses.map(
					e => <ButtonLink
					key = {e.id}
					caption={`${e.comments.length} comments`}
					onClick={this.toggleModalWindowState}
					onClickArguments = {{
					expense: e.id,
					expenseComments: e.comments
					}}
					/>
			),
			this.props.expenses.map(
					e => <DeleteIcon key = {e.id} onClick = {this.onDeleteExpenseClick} onClickArguments = {{id: e.id}}/>
			)
		];
		return (
			<div>
				<ModalWindow
					isOpen={this.state.isModalOpened}
					contentLabel="Expense comments"
					>
					<ExpenseCommentsPage
						onClose={this.toggleModalWindowState}
						expense={this.state.selectedExpense}
						preloadedComments={this.state.preloadedComments}
						/>
				</ModalWindow>
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
