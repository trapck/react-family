import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import months from "../../static-data/months";
import CollapsibleGroup from "../common/collapsible-group";
import * as actionCreators from "../../redux/actions/action-creators";
import GeneralInfoRow from "./general-info-row";
import ExpensesList from "./expenses-list";
import BudgetMainDateFilter from "./budget-main-date-filter";
import PreloaderContainer from "../common/preloader-container";
import DropDownInput from "../common/dropdown-input";
import Summary from "./month-summary";
import NewExpense from "./new-expense";
import guid from "uuid/v4";

class BudgetMain extends React.Component {
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
		this.onCurrentMonthChange = this.onCurrentMonthChange.bind(this);
		this.onCurrentYearChange = this.onCurrentYearChange.bind(this);
	}


	componentDidMount() {
		const currentMonth = this.props.currentMonth.number,
			currentYear = this.props.currentYear,
			currentMonthFilters = [
				{
					column: "month",
					value: currentMonth
				}, {
					column: "year",
					value: currentYear
				}
			];
		this.props.getCurrentMonthGeneralInfo(undefined, this.isLoadingToken, currentMonth, currentYear);
		this.props.getMonthExpenseLimits(currentMonthFilters);
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	setGeneralInfoGroupCollapsed(key, isCollapsed) {
		this.props.setGeneralInfoGroupCollapsed(key, isCollapsed);
	}

	getSummaryInfo() {
		let count = 0,
			amount = 0;
		for (let info of this.props.generalInfo) {
			count += info.count;
			amount += info.amount;
		}
		return {
			count,
			amount,
			income: this.props.monthLimit.income || 0,
			limit: this.props.monthLimit.limit || 0
		};
	}

	onCurrentMonthChange(tag, value) {
		this.props.setCurrentMonth(Number.isInteger(value.value) ? value.value : new Date().getMonth());
	}

	onCurrentYearChange(e) {
		this.props.setCurrentYear(Number(e.target.value) || new Date().getFullYear());
	}

	render() {
		return (
			<div>
				<BudgetMainDateFilter
					monthValue = {{label: this.props.currentMonth.title, value: this.props.currentMonth.number}}
					yearValue = {this.props.currentYear}
					onMonthChange = {this.onCurrentMonthChange}
					onYearChange = {this.onCurrentYearChange}
					/>
				<button onClick = {this.props.toggleNewExpenseVisible}>
					{this.props.isNewExpenseVisible ? "-" : "+"}
				</button>
				{this.props.isNewExpenseVisible ? <NewExpense/> : null}
				<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
					<div>
						{this.props.generalInfo.map(
							({category, count, amount, displayValues}) => {
								let onClick = this.setGeneralInfoGroupCollapsed.bind(this, category),
									isCollapsed = this.props.generalInfoRowsCollapsedState.hasOwnProperty(category) ?
										this.props.generalInfoRowsCollapsedState[category] :
										true;
								return (
									<CollapsibleGroup key = {category}>
										<GeneralInfoRow
											generalInfoRowModel = {{category, count, amount, displayValues}}
											isCollapsed = {isCollapsed}
											onHeaderClick = {onClick}
											/>
										<ExpensesList
											category = {category}
											count = {count}
											amount = {amount}
											dateFilterValue = {{
												M: this.props.currentMonth.number,
												Y: this.props.currentYear
											}}
											isSyncNeeded/>
									</CollapsibleGroup>
								);
							}
						)}
						<Summary {...this.getSummaryInfo()}/>
					</div>
				</PreloaderContainer>
			</div>
		);
	}
}

BudgetMain.propTypes = {
	generalInfo: PropTypes.array.isRequired,
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired,
	monthLimit: PropTypes.object.isRequired,
	getMonthExpenseLimits: PropTypes.func.isRequired,
	generalInfoRowsCollapsedState: PropTypes.object.isRequired,
	setGeneralInfoGroupCollapsed: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired,
	isNewExpenseVisible: PropTypes.bool,
	toggleNewExpenseVisible: PropTypes.func.isRequired,
	currentMonth: PropTypes.object.isRequired,
	setCurrentMonth: PropTypes.func.isRequired,
	currentYear: PropTypes.number.isRequired,
	setCurrentYear: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		generalInfo: state.budget.currentMonthGeneralInfo
			.slice()
			.sort((a,b) => {
				if (a.displayValues.category < b.displayValues.category ) return -1;
				else if (a.displayValues.category > b.displayValues.category ) return 1;
				else return 0;
			}),
		generalInfoRowsCollapsedState: state.budget.ui.isGeneralInfoRowCollapsed,
		monthLimit: state.budget.monthLimits
			.filter(l => l.month === state.budget.ui.currentMonth && l.year === state.budget.ui.currentYear)[0] || {},
		isLoading: state.isLoading,
		isNewExpenseVisible: state.budget.ui.isNewExpenseVisible,
		currentMonth: state.budget.ui.currentMonth,
		currentYear: state.budget.ui.currentYear
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMain);
