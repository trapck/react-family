import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import CollapsibleGroup from "../common/collapsible-group";
import * as actionCreators from "../../redux/actions/action-creators";
import GeneralInfoRow from "./general-info-row";

class BudgetMain extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getExpenses(); // TODO: check to make call each time when selecting BudgetMain
		this.props.getCurrentMonthGeneralInfo();
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
							return (
								<CollapsibleGroup key = {category}>
									<GeneralInfoRow title = {category} category = {category} count = {count} amount = {amount}/>
									<p>{`${category} *** ${count} *** ${amount}`}</p>
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
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		expenses: state.budget.expenses,
		generalInfo: state.budget.currentMonthGeneralInfo
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMain);
