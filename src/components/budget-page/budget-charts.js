import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import CurrentMonthCategoriesChart from "./current-month-categories-chart";
import YearAmountChart from "./year-amount-chart";

/*
* 1. Add isLoadingTokens
* 2. Enable number of month editing in year chart
* */


class BudgetCharts extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const currentMonth = this.props.currentMonth.number,
			currentYear = this.props.currentYear;
		this.props.getCurrentMonthGeneralInfo(undefined, this.isLoadingToken, currentMonth, currentYear);
		this.props.getYearChartData();
	}

	render() {
		return (
			<div>
				<CurrentMonthCategoriesChart generalInfo={this.props.generalInfo}/>
				<YearAmountChart chartData={this.props.yearChartData}/>
			</div>
		);
	}
}

BudgetCharts.propTypes = {
	generalInfo: PropTypes.array.isRequired,
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired,
	currentMonth: PropTypes.object.isRequired,
	currentYear: PropTypes.number.isRequired,
	yearChartData: PropTypes.array.isRequired,
	getYearChartData: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		generalInfo: state.budget.currentMonthGeneralInfo,
		currentMonth: state.budget.ui.currentMonth,
		currentYear: state.budget.ui.currentYear,
		yearChartData: state.budget.yearChartData
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BudgetCharts);
