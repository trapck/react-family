import React, {PropTypes} from "react";
import LineChart from "../common/line-chart";
import CollapsibleGroup from "../common/collapsible-group";

class YearAmountChart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: false
		};
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
			},
			preventFn = e => {
				e.preventDefault();
				this.setState({isCollapsed: !this.state.isCollapsed});
			};
		return (
			<CollapsibleGroup>
				<div isCollapsed={this.state.isCollapsed}>
					<a href = "#" className = {this.state.isCollapsed ? "link" : "link_active"} onClick = {preventFn}>
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
