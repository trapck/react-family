import React, {PropTypes} from "react";
import {Pie} from "react-chartjs-2";

const PieChart = (props) => {
	return (
		<div>
			<Pie data={props.chartData}/>
		</div>
	);

};

PieChart.propTypes = {
	chartData: PropTypes.object.isRequired
};

export default PieChart;
