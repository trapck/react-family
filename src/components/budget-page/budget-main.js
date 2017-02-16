import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CollapsibleGroup from "../common/collapsible-group";
import * as actionCreators from "../../redux/actions/action-creators";
import GeneralInfoRow from "./general-info-row";
import ExpensesList from "./expenses-list";
import PreloaderContainer from "../common/preloader-container";
import guid from "uuid/v4";

class BudgetMain extends React.Component {
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
	}

	componentDidMount() {
		this.props.getCurrentMonthGeneralInfo(this.isLoadingToken);
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	setGeneralInfoGroupCollapsed(key, isCollapsed) {
		this.props.setGeneralInfoGroupCollapsed(key, isCollapsed);
	}

	render() {
		return (
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
									<ExpensesList category = {category} count = {count} amount = {amount} isSyncNeeded/>
								</CollapsibleGroup>
							);
						}
					)}
				</div>
			</PreloaderContainer>
		);
	}
}

BudgetMain.propTypes = {
	expenses: PropTypes.array.isRequired,
	generalInfo: PropTypes.array.isRequired,
	getExpenses: PropTypes.func.isRequired,
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired,
	generalInfoRowsCollapsedState: PropTypes.object.isRequired,
	setGeneralInfoGroupCollapsed: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		expenses: state.budget.expenses,
		generalInfo: state.budget.currentMonthGeneralInfo,
		generalInfoRowsCollapsedState: state.budget.ui.isGeneralInfoRowCollapsed,
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMain);
