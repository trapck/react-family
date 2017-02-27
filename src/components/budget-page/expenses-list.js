import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PreloaderContainer from "../common/preloader-container";
import * as actionCreators from "../../redux/actions/action-creators";
import Expense from "./expense";
import {getEntityColumnsCaptions, getDateColumnEqualityComparisonResult} from "../../../other/utils";
import guid from "uuid/v4";

class ExpensesList extends React.Component {
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
	}

	componentDidMount() {
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
			this.props.getCurrentMonthGeneralInfo(filters);
		}
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	render() {
		return (
			<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
				<table className = "expenses-table">
					<tbody>
					<tr>
						{getEntityColumnsCaptions("expense", ["id"]).map((c, i) => <th key={i}>{c}</th>)}
					</tr>
					{this.props.expenses.map(e => <Expense key={e.id} expense={e}/>)}
					</tbody>
				</table>
			</PreloaderContainer>
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
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired,
	dateFilterValue: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
	let filterExpensesFn;
	if (ownProps.dateFilterValue) {
		filterExpensesFn = e =>
		e.category === ownProps.category && getDateColumnEqualityComparisonResult(e.date, ownProps.dateFilterValue);
	} else {
		filterExpensesFn = e => e.category === ownProps.category;
	}
	return {
		expenses: state.budget.expenses.filter(e =>
				e.category === ownProps.category &&
				ownProps.dateFilterValue
					? getDateColumnEqualityComparisonResult(e.date, ownProps.dateFilterValue)
					: true
		),
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
