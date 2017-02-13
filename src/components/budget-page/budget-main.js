import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CollapsibleGroup from "../common/collapsible-group";
import * as actionCreators from "../../redux/actions/action-creators";
import GeneralInfoRow from "./general-info-row";
import ExpensesList from "./expenses-list";

class BudgetMain extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getExpenses(); // TODO: check to make call each time when selecting BudgetMain
		this.props.getCurrentMonthGeneralInfo();
	}

	setGeneralInfoGroupCollapsed(key, isCollapsed) {
		this.props.setGeneralInfoGroupCollapsed(key, isCollapsed);
	}

	render() {
		return (
			<div>
				<div>Current month</div>
				<ul>
					{this.props.expenses.map(item => {
						return (
							<li key = {item.id}>{item.id + " " + item.title}</li>
						);
					})}
				</ul>
				<p>{"-".repeat(100)}</p>
				<div>
					{this.props.generalInfo.map(
						({category, count, amount}) => {
							let onClick = this.setGeneralInfoGroupCollapsed.bind(this, category),
								isCollapsed = this.props.generalInfoRowsCollapsedState.hasOwnProperty(category) ?
									this.props.generalInfoRowsCollapsedState[category] :
									true,
								expenses = this.props.expenses.filter(e => e.category === category);
							return (
								<CollapsibleGroup key = {category}>
									<GeneralInfoRow
										title = {category}
										category = {category}
										count = {count}
										amount = {amount}
										isCollapsed = {isCollapsed}
										onHeaderClick = {onClick}
									/>
									<ExpensesList expenses = {expenses}/>
								</CollapsibleGroup>
							);
						}
					)}
				</div>
			</div>
		);
	}
}

BudgetMain.propTypes = {
	expenses: PropTypes.array.isRequired,
	getExpenses: PropTypes.func.isRequired,
	generalInfo: PropTypes.array.isRequired,
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired,
	generalInfoRowsCollapsedState: PropTypes.object.isRequired,
	setGeneralInfoGroupCollapsed: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		expenses: state.budget.expenses,
		generalInfo: state.budget.currentMonthGeneralInfo,
		generalInfoRowsCollapsedState: state.budget.ui.isGeneralInfoRowCollapsed
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMain);
