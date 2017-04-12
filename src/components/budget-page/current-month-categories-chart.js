import React, {PropTypes} from "react";
import PieChart from "../common/pie-chart";
import CollapsibleGroup from "../common/collapsible-group";
import {generateRandomColor} from "../../helpers/visual-helpers/chart-helper";

class CurrentMonthCategoriesChart  extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isCollapsed: false
		};
	}

	render() {
		if (!this.props.generalInfo || !this.props.generalInfo.length) {
			return (
				<div></div>
			);
		}
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
				<PieChart chartData={data}/>
			</CollapsibleGroup>
		);
	}
}

CurrentMonthCategoriesChart.propTypes = {
	generalInfo: PropTypes.array
};

export default CurrentMonthCategoriesChart;
