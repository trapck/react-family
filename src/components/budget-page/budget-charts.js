import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import CurrentMonthCategoriesChart from "./current-month-categories-chart";
import YearAmountChart from "./year-amount-chart";

class BudgetCharts extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			yearChartMonthCount: 12
		};
		this.getMonthCategoriesChartData = this.getMonthCategoriesChartData.bind(this);
		this.onYearChartMonthCountChange = this.onYearChartMonthCountChange.bind(this);
	}

	componentDidMount() {
		const currentMonth = this.props.currentMonth.number,
			currentYear = this.props.currentYear;
		this.getMonthCategoriesChartData(currentMonth, currentYear);
		this.getYearChartData(this.state.yearChartMonthCount);
	}

	getMonthCategoriesChartData(month, year) {
		this.props.getCurrentMonthGeneralInfo({
			isLoadingToken: this.isLoadingToken,
			currentMonth: month,
			currentYear: year
		});
	}

	onYearChartMonthCountChange(e) {
		let yearChartMonthCount = Number(e.target.value) || 12;
		this.setState(Object.assign({}, this.state, {yearChartMonthCount}));
		this.getYearChartData(yearChartMonthCount);
	}

	getYearChartData(monthCount) {
		this.props.getYearChartData({monthCount});
	}

	render() {
		return (
			<div>
				<CurrentMonthCategoriesChart
					currentMonth={this.props.currentMonth}
					currentYear={this.props.currentYear}
					generalInfo={this.props.generalInfo}
					updateChartData={this.getMonthCategoriesChartData}/>
				<YearAmountChart
					monthCount={this.state.yearChartMonthCount}
					onMonthCountChange={this.onYearChartMonthCountChange}
					chartData={this.props.yearChartData}
				/>
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
