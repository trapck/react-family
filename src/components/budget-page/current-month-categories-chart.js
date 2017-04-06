import React, {PropTypes} from "react";
import PieChart from "../common/pie-chart";
import {generateRandomColor} from "../../helpers/visual-helpers/chart-helper";

const CurrentMonthCategoriesChart = props => {
	if (!props.generalInfo || !props.generalInfo.length) {
		return (
			<div></div>
		);
	}
		const data = {
			labels: props.generalInfo.map(({displayValues}) => displayValues.category),
			datasets: [{
				data: props.generalInfo.map(({amount}) => amount),
				backgroundColor: props.generalInfo.map(() => generateRandomColor())
			}]
		};
	return (
		<div>
			<PieChart chartData={data}/>
		</div>
	);
};

CurrentMonthCategoriesChart.propTypes = {
	generalInfo: PropTypes.array
};

export default CurrentMonthCategoriesChart;
