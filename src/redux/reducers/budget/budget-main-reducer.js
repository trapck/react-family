import {combineReducers} from "redux";
import initialState from "../../store/initial-state";
import expenses from "./expenses-reducer";
import newExpense from "./new-expense-reducer";
import currentMonthGeneralInfo from "./current-month-info-reducer";
import monthLimits from "./expense-limits-reducer";
import ui from "./ui/budget-ui-main-reducer";

const budget = (state = initialState.budget, action = {}) => {
	return Object.assign({}, state, {
		expenses: expenses(state.expenses, action),
		newExpense: newExpense(state.newExpense, action),
		currentMonthGeneralInfo: currentMonthGeneralInfo(state.currentMonthGeneralInfo, action),
		monthLimits: monthLimits(state.monthLimits, action),
		ui: ui(state.ui, action)
	});
};
export default budget;
