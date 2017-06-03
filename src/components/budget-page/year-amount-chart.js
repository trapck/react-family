import React, {PropTypes} from "react";
import LineChart from "../common/line-chart";
import CollapsibleGroup from "../common/collapsible-group";

class YearAmountChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: false
		};
		this.preventFn = this.preventFn.bind(this);
	}

	preventFn(e) {
		e.preventDefault();
		this.setState(
			Object.assign({}, this.state, {isCollapsed: !this.state.isCollapsed})
		);
	}

	render() {
		if (!this.props.chartData || !this.props.chartData.length) {
			return (
				<div></div>
			);
		}
		const data = {
			labels: this.props.chartData.map(d => d.month),
			values: this.props.chartData.map(d => d.amount)
		};
		return (
			<CollapsibleGroup>
				<div isCollapsed={this.state.isCollapsed}>
					<a href = "#" className = {this.state.isCollapsed ? "link" : "link_active"} onClick = {this.preventFn}>
						<h3>Year amount</h3>
					</a>
				</div>
				<div>
					<label>Months</label>
					<input
						type = {"number"}
						onChange = {this.props.onMonthCountChange}
						value = {this.props.monthCount}
					/>
					<LineChart chartData={data}/>
				</div>
			</CollapsibleGroup>
		);
	}
}

YearAmountChart.propTypes = {
	chartData: PropTypes.array,
	monthCount: PropTypes.number.isRequired,
	onMonthCountChange: PropTypes.func.isRequired
};

export default YearAmountChart;
