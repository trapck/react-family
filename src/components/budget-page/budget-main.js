import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CollapsibleGroup from "../common/collapsible-group";
import Button from "../common/button";
import * as actionCreators from "../../redux/actions/action-creators";
import GeneralInfoRow from "./general-info-row";
import ExpensesList from "./expenses-list";
import BudgetMainDateFilter from "./budget-main-date-filter";
import PreloaderContainer from "../common/preloader-container";
import Summary from "./month-summary";
import NewExpense from "./new-expense";
import guid from "uuid/v4";
import {sortBy} from "lodash";

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
		this.props.removeIsLoading({isLoadingToken: this.isLoadingToken});
	}

	setGeneralInfoGroupCollapsed(key, isCollapsed) {
		this.props.setGeneralInfoGroupCollapsed(key, isCollapsed);
	}

	getSummaryInfo() {
		let count = 0,
			amount = 0;
		const {generalInfo, monthLimit} = this.props;
		for (let info of generalInfo) {
			count += info.count;
			amount += info.amount;
		}
		return {
			count,
			amount,
			income: monthLimit.income || 0,
			limit: monthLimit.limit || 0
		};
	}

	onCurrentMonthChange(tag, value) {
		const currentMonth = Number.isInteger(value.value) ? value.value : new Date().getMonth(),
			currentYear = this.props.currentYear;
		this.executeCurrentDateActions(currentMonth, currentYear);
	}

	onCurrentYearChange(e) {
		const currentMonth = this.props.currentMonth.number,
			currentYear = Number(e.target.value) || new Date().getFullYear();
		this.executeCurrentDateActions(currentMonth, currentYear);
	}

	executeCurrentDateActions(currentMonth, currentYear) {
		const currentMonthFilters = [
				{
					column: "month",
					value: currentMonth
				}, {
					column: "year",
					value: currentYear
				}
			],
			{
				setCurrentMonth,
				setCurrentYear,
				getCurrentMonthGeneralInfo,
				getMonthExpenseLimits
				} = this.props;
		setCurrentMonth({currentMonth});
		setCurrentYear({currentYear});
		getCurrentMonthGeneralInfo(
			undefined,
			this.isLoadingToken,
			currentMonth,
			currentYear
		);
		getMonthExpenseLimits(currentMonthFilters);
	}

	render() {
		const {
			currentMonth,
			currentYear,
			toggleNewExpenseVisible,
			isNewExpenseVisible,
			isLoading,
			generalInfo,
			generalInfoRowsCollapsedState
			} = this.props;
		return (
			<div>
				<BudgetMainDateFilter
					monthValue = {{label: currentMonth.title, value: currentMonth.number}}
					yearValue = {currentYear}
					onMonthChange = {this.onCurrentMonthChange}
					onYearChange = {this.onCurrentYearChange}
					/>
				<Button
					onClick = {toggleNewExpenseVisible}
					caption = {isNewExpenseVisible ? "-" : "+"}
					/>
				{isNewExpenseVisible ? <NewExpense/> : null}
				<PreloaderContainer isLoading = {isLoading} isLoadingToken = {this.isLoadingToken}>
					<div>
						{generalInfo.map(
							({category, count, amount, displayValues}) => {
								let onClick = this.setGeneralInfoGroupCollapsed.bind(this, category),
									isCollapsed = generalInfoRowsCollapsedState.hasOwnProperty(category) ?
										generalInfoRowsCollapsedState[category] :
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
												M: currentMonth.number,
												Y: currentYear
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
		generalInfo: sortBy(
			state.budget.currentMonthGeneralInfo.slice(),
			(g = {displayValues: {}}) => g.displayValues.category),
		generalInfoRowsCollapsedState: state.budget.ui.isGeneralInfoRowCollapsed,
		monthLimit: state.budget.monthLimits
			.filter(l => l.month === state.budget.ui.currentMonth.number && l.year === state.budget.ui.currentYear)[0] || {},
		isLoading: state.isLoading,
		isNewExpenseVisible: state.budget.ui.isNewExpenseVisible,
		currentMonth: state.budget.ui.currentMonth,
		currentYear: state.budget.ui.currentYear
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMain);
