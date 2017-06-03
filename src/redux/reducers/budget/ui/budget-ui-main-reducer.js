import initialState from "../../../store/initial-state";
import isGeneralInfoRowCollapsed from "./general-info-row-collapsed-reducer";
import isNewExpenseVisible from "./toggle-new-expense-visible-reducer";
import isNewExpenseCategoryVisible from "./toggle-new-expense-category-visible-reducer";
import isShowCurrentMonthLimitOnly from "./toggle-show-current-month-limit-only-reducer";
import currentMonth from "./current-month-reducer";
import currentYear from "./current-year-reducer";

export default (state = initialState.budget.ui, action = {}) => {
	return Object.assign({}, state, {
		isGeneralInfoRowCollapsed: isGeneralInfoRowCollapsed(state.isGeneralInfoRowCollapsed, action),
		isNewExpenseVisible: isNewExpenseVisible(state.isNewExpenseVisible, action),
		isNewExpenseCategoryVisible: isNewExpenseCategoryVisible(state.isNewExpenseCategoryVisible, action),
		isShowCurrentMonthLimitOnly: isShowCurrentMonthLimitOnly(state.isShowCurrentMonthLimitOnly, action),
		currentMonth: currentMonth(state.currentMonth, action),
		currentYear: currentYear(state.currentYear, action)
	});
};
