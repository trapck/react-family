import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PreloaderContainer from "../common/preloader-container";
import * as actionCreators from "../../redux/actions/action-creators";
import Expense from "./expense";
import babelPolyfill from "babel-polyfill";
import {getEntityColumnsCaptions} from "../../../other/utils";
import guid from "uuid/v4";

class ExpensesList extends React.Component {
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
	}

	componentDidMount() {
		this.props.getExpenses(this.props.category, this.isLoadingToken);
		if (this.props.isSyncNeeded) {
			this.props.getCurrentMonthGeneralInfo(this.props.category);
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
	isLoading: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
	return {
		expenses: state.budget.expenses.filter(e => e.category === ownProps.category),
		isLoading: state.isLoading
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesList);
