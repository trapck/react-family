import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const expenseCategoriesReducer = (state = initialState.expenseCategories, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_RECEIVED_EXPENSE_CATEGORIES: {
			let newCategories = [...action.categories];
			for(let category of state) {
				if (!action.categories.filter(c => c.id === category.id).length) {
					newCategories.push(...category);
				}
			}
			return newCategories;
		}
		case actionTypes.REGISTER_NEW_EXPENSE_CATEGORY_IN_STATE:
			return [...state, Object.assign({}, action.expenseCategory)];
		default:
			return state;
	}
};
export default expenseCategoriesReducer;
