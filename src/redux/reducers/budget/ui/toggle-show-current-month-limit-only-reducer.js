import actionTypes from "../../../actions/action-types";

export default (state = false, action = {}) => {
	switch (action.type) {
		case actionTypes.TOGGLE_SHOW_CURRENT_MONTH_LIMIT_ONLY:
			return !state;
		default:
			return state;
	}
};
