import initialState from "../../../store/initial-state";
import actionTypes from "../../../actions/action-types";

export default (state = false, action = {}) => {
	switch (action.type) {
		case actionTypes.TOGGLE_NEW_EXPENSE_VISIBLE:
			return !state;
		default:
			return state;
	}
};
