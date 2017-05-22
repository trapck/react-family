import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const newExpenseCommentReducer = (state = {}, action = {}) => {
	switch (action.type) {
		case actionTypes.NEW_EXPENSE_COMMENT_CHANGE:
		{
			return Object.assign({}, state, {[action.column]: action.value});
		}
		case actionTypes.CLEAR_NEW_EXPENSE_COMMENT:
			return {};
		default:
			return state;
	}
};
export default newExpenseCommentReducer;
