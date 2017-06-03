import actionTypes from "../../../actions/action-types";

export default (state = false, action = {}) => {
	switch (action.type) {
		case actionTypes.TOGGLE_NEW_EXPENSE_CATEGORY_VISIBLE:
			return !state;
		default:
			return state;
	}
};
