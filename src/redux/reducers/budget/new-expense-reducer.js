import actionTypes from "../../actions/action-types";

const newExpenseReducer = (state = {}, action = {}) => {
	switch (action.type) {
		case actionTypes.NEW_EXPENSE_CHANGE:
			return Object.assign({}, state, {[action.column]: action.value});
		case actionTypes.CLEAR_NEW_EXPENSE:
			return {
				date: new Date(new Date().setHours(0, 0, 0, 0))
			};
		default:
			return state;
	}
};
export default newExpenseReducer;
