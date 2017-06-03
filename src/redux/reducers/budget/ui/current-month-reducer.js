import actionTypes from "../../../actions/action-types";
import months from "../../../../static-data/months";

export default (state = {}, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_MONTH:
			return months.data.filter(m => m.number === action.number)[0];
		default:
			return state;
	}
};
