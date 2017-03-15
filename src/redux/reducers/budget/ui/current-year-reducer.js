import initialState from "../../../store/initial-state";
import actionTypes from "../../../actions/action-types";

export default (state = {}, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_YEAR:
			return action.year;
		default:
			return state;
	}
};
