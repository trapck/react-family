import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const newExpenseCategoryReducer = (state = {}, action = {}) => {
	switch (action.type) {
		case actionTypes.NEW_EXPENSE_CATEGORY_CHANGE:
			return Object.assign({}, state, {[action.column]: action.value});
		case actionTypes.CLEAR_NEW_EXPENSE_CATEGORY:
			return {
				isNotVisibleInList: false
			};
		default:
			return state;
	}
};
export default newExpenseCategoryReducer;
