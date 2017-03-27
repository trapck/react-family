import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import PreloaderContainer from "../common/preloader-container";
import LabelCover from "../common/label-cover";
import BooleanInput from "../common/boolean-input";
import entityListHelper from "../../helpers/visual-helpers/entity-list-helper";
import * as actionCreators from "../../redux/actions/action-creators";
import MonthExpenseLimit from "./month-expense-limit";
import {getEntityColumnsCaptions} from "../../../other/utils";
import toastr from "toastr";
import guid from "uuid/v4";

class MonthExpenseLimitsList extends React.Component {
	constructor(props) {
		super(props);
		this.onLimitValueUpdated = this.onLimitValueUpdated.bind(this);
		this.onCurrentMonthOnlyChange = this.onCurrentMonthOnlyChange.bind(this);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		let filters = [];
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

	onCurrentMonthOnlyChange(tag, value) {
		this.props.toggleShowCurrentMonthLimitOnly(value);
	}

	render() {
		return (
			<div>
				<LabelCover caption = "Current month only" isHorizontal>
					<BooleanInput
						value = {this.props.isShowCurrentMonthLimitOnly}
						onChange = {this.onCurrentMonthOnlyChange}
						isFocusCanceled
					/>
				</LabelCover>
				<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
					{
						entityListHelper.createTableList(
							MonthExpenseLimit,
							this.props.monthExpenseLimits,
							"monthExpenseLimit",
							this.onLimitValueUpdated,
							[],
							[],
							["id"],
							"month-expense-limits-table"
						)
					}
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
	isShowCurrentMonthLimitOnly: PropTypes.bool,
	toggleShowCurrentMonthLimitOnly: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		monthExpenseLimits: (state.budget.ui.isShowCurrentMonthLimitOnly ?
			state.budget.monthLimits.filter(
					l => l.month === state.budget.ui.currentMonth.number && l.year === state.budget.ui.currentYear
				) :
			state.budget.monthLimits).sort((a,b) => (a.year + a.month) - (b.year + b.month)),
		isShowCurrentMonthLimitOnly: state.budget.ui.isShowCurrentMonthLimitOnly
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MonthExpenseLimitsList);
