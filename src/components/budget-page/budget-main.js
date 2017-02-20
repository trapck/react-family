import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CollapsibleGroup from "../common/collapsible-group";
import * as actionCreators from "../../redux/actions/action-creators";
import GeneralInfoRow from "./general-info-row";
import ExpensesList from "./expenses-list";
import PreloaderContainer from "../common/preloader-container";
import Summary from "./month-summary";
import guid from "uuid/v4";

class BudgetMain extends React.Component {
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
	}

	componentDidMount() {
		this.props.getCurrentMonthGeneralInfo(undefined, this.isLoadingToken);
		this.props.getMonthExpenseLimits(undefined, [
			{
				column: "month",
				value: new Date().getMonth()
			}, {
				column: "year",
				value: new Date().getFullYear()
			}
		]);
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

	render() {
		return (
			<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
				<div>
					<p>{(this.props.monthLimit.income || 0) + " " + (this.props.monthLimit.limit || 0)}</p>
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
									<ExpensesList category = {category} count = {count} amount = {amount} isSyncNeeded/>
								</CollapsibleGroup>
							);
						}
					)}
					<Summary {...this.getSummaryInfo()}/>
				</div>
			</PreloaderContainer>
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
	isLoading: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		generalInfo: state.budget.currentMonthGeneralInfo,
		generalInfoRowsCollapsedState: state.budget.ui.isGeneralInfoRowCollapsed,
		monthLimit: state.budget.monthLimits
			.filter(l => l.month === new Date().getMonth() && l.year === new Date().getFullYear())[0] || {},
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMain);
