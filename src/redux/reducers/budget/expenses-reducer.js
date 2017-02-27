import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const expenses = (state = [], action = {}) => {
	switch (action.type) {
		case actionTypes.SET_RECEIVED_EXPENSES:
		{
			let category = ((action.filters || []).filter(f => f.column === "category")[0] || {}).value;
			if (category) {
				return state.filter(e => e.category !== category).concat(action.expenses);
			}
			return action.expenses || []; // TODO: import immutable state checker
		}
		case actionTypes.REGISTER_NEW_EXPENSE_IN_STATE:
			return [...state, Object.assign({}, action.expense)];
		default:
			return state;
	}
};
export default expenses;
