import actionTypes from "../../actions/action-types";

const yearChartDataReducer = (state = [], action = {}) => {
	switch (action.type) {
		case actionTypes.SET_RECEIVED_YEAR_CHART_DATA:
			return action.data;
		default:
			return state;
	}
};
export default yearChartDataReducer;
