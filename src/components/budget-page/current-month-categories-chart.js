import React, {PropTypes} from "react";
import PieChart from "../common/pie-chart";
import CollapsibleGroup from "../common/collapsible-group";
import BudgetMainDateFilter from "./budget-main-date-filter";
import {generateRandomColor} from "../../helpers/visual-helpers/chart-helper";

class CurrentMonthCategoriesChart  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: false
		};
		this.onCurrentMonthChange = this.onCurrentMonthChange.bind(this);
		this.onCurrentYearChange = this.onCurrentYearChange.bind(this);
	}

	onCurrentMonthChange(tag, value) {
		const month = Number.isInteger(value.value) ? value.value : new Date().getMonth(),
			year = this.props.currentYear;
		this.props.updateChartData(month, year);
		this.setState(
			Object.assign({}, this.state, {
				month: Object.assign({}, this.props.currentMonth, {
					title: value.label,
					number: value.value
				})
			})
		);
	}

	onCurrentYearChange(e) {
		const month = this.props.currentMonth.number,
			year = Number(e.target.value) || new Date().getFullYear();
		this.props.updateChartData(month, year);
		this.setState(
			Object.assign({}, this.state, {year})
		);
	}

	render() {
		const data = {
				labels: this.props.generalInfo.map(({displayValues}) => displayValues.category),
				datasets: [{
					data: this.props.generalInfo.map(({amount}) => amount),
					backgroundColor: this.props.generalInfo.map(() => generateRandomColor())
				}]
			},
			preventFn = e => {
				e.preventDefault();
				this.setState({isCollapsed: !this.state.isCollapsed});
			};
		return (
			<CollapsibleGroup>
				<div isCollapsed={this.state.isCollapsed}>
					<a href = "#" className = {this.state.isCollapsed ? "link" : "link_active"} onClick = {preventFn}>
						<h3>Current month</h3>
					</a>
				</div>
				<div>
					<BudgetMainDateFilter
						monthValue = {{
						label: (this.state.month || this.props.currentMonth).title,
						value: (this.state.month || this.props.currentMonth).number
						}}
						yearValue = {this.state.year || this.props.currentYear}
						onMonthChange = {this.onCurrentMonthChange}
						onYearChange = {this.onCurrentYearChange}
					/>
					<PieChart chartData={data}/>
				</div>
			</CollapsibleGroup>
		);
	}
}

CurrentMonthCategoriesChart.propTypes = {
	generalInfo: PropTypes.array,
	currentMonth: PropTypes.object.isRequired,
	currentYear: PropTypes.number.isRequired,
	updateChartData: PropTypes.func.isRequired
};

export default CurrentMonthCategoriesChart;
