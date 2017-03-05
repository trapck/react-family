import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PreloaderContainer from "../common/preloader-container";
import * as actionCreators from "../../redux/actions/action-creators";
import MonthExpenseLimit from "./month-expense-limit";
import {getEntityColumnsCaptions} from "../../../other/utils";
import toastr from "toastr";
import guid from "uuid/v4";

class MonthExpenseLimitsList extends React.Component {
	constructor(props) {
		super(props);
		this.onLimitValueUpdated = this.onLimitValueUpdated.bind(this);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		let filters = [];
		if (this.props.isShowCurrentMonthOnly) {
			filters.push({
				column: "month",
				value: new Date().getMonth()
			}, {
				column: "year",
				value: new Date().getFullYear()
			});
		}
		this.props.getMonthExpenseLimits(filters, this.isLoadingToken);
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	onLimitValueUpdated(id, columnName, columnValue) {
		this.props.updateMonthExpenseLimit([
			{
				id,
				values: [
					{
						columnName,
						columnValue
					}
				]
			}
		], this.isLoadingToken).then(() => {
			toastr.success("Limit updated");
			this.props.removeIsLoading(this.isLoadingToken);
		});
	}

	render() {
		return (
			<div>
				<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
					<table className = "month-expense-limits-table">
						<tbody>
						<tr>
							{getEntityColumnsCaptions("monthExpenseLimit", ["id"]).map((c, i) => <th key={i}>{c}</th>)}
						</tr>
						{this.props.monthExpenseLimits.map(e => <MonthExpenseLimit
							key={e.id}
							monthExpenseLimit={e}
							onValueChange={this.onLimitValueUpdated}
						/>)}
						</tbody>
					</table>
				</PreloaderContainer>
			</div>
		);
	}
}

MonthExpenseLimitsList.propTypes = {
	monthExpenseLimits: PropTypes.array.isRequired,
	getMonthExpenseLimits: PropTypes.func.isRequired,
	updateMonthExpenseLimit: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired,
	isShowCurrentMonthOnly: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
	return {
		isLoading: state.isLoading,
		monthExpenseLimits: (ownProps.isShowCurrentMonthOnly ?
			state.budget.monthLimits.filter(l => l.month === new Date().getMonth() && l.year === new Date().getFullYear()) :
			state.budget.monthLimits).
			sort((a,b) => (a.year + a.month) - (b.year + b.month))
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MonthExpenseLimitsList);
