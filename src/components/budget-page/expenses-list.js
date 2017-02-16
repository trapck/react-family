import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../../redux/actions/action-creators";
import Expense from "./expense";
import babelPolyfill from "babel-polyfill";
import {getEntityColumnsCaptions} from "../../../other/utils";

class ExpensesList extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getExpenses(this.props.category);
	}

	render() {
		if (this.props.isSyncNeeded) {
			let actualCount = this.props.expenses.length,
				actualAmount = 0;
			actualAmount = this.props.expenses.reduce((total, ex) => (ex.amount || 0) + total, actualAmount);
			if (actualCount !== this.props.count || actualAmount !== this.props.amount) {
				this.props.getCurrentMonthGeneralInfo(this.props.category);
			}
		}
		return (
			<table>
				<tbody>
				<tr>
					{getEntityColumnsCaptions("expense", ["id"]).map((c, i) => <th key={i}>{c}</th>)}
				</tr>
				{this.props.expenses.map(e => <Expense key={e.id} expense={e}/>)}
				</tbody>
			</table>
		);
	}
}

ExpensesList.propTypes = {
	expenses: PropTypes.array.isRequired,
	getExpenses: PropTypes.func.isRequired,
	count: PropTypes.number,
	amount: PropTypes.number,
	category: PropTypes.string.isRequired,
	isSyncNeeded: PropTypes.bool,
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		expenses: state.budget.expenses.filter(e => e.category === ownProps.category)
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
