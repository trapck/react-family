import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const expenses = (state = [], action = {}) => {
	switch (action.type) {
		case actionTypes.SET_RECEIVED_EXPENSES:
					return action.expenses || []; // TODO: import immutable state checker
		default:
					return state;
	}
};
export default expenses;
