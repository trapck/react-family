import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const generalInfoReducer = (state = initialState.budget.currentMonthGeneralInfo, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_RECEIVED_CURRENT_MONTH_GENERAL_INFO:
			if (action.category) {
				return state.map(e => {
					return e.category === action.category ? action.info[0] : e;
				});
			}
			return action.info;
		default:
			return state;
	}
};
export default generalInfoReducer;
