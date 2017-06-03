import initialState from "../../store/initial-state";
import expenses from "./expenses-reducer";
import expenseComments from "./expense-comments-reducer";
import newExpense from "./new-expense-reducer";
import newExpenseComment from "./new-expense-comment-reducer";
import newExpenseCategory from "./new-expense-category-reducer";
import currentMonthGeneralInfo from "./current-month-info-reducer";
import monthLimits from "./expense-limits-reducer";
import expenseCategories from "./expense-categories-reducer";
import yearChartData from "./year-chart-data-reducer";
import ui from "./ui/budget-ui-main-reducer";

const budget = (state = initialState.budget, action = {}) => {
	return Object.assign({}, state, {
		expenses: expenses(state.expenses, action),
		expenseComments: expenseComments(state.expenseComments, action),
		newExpense: newExpense(state.newExpense, action),
		newExpenseComment: newExpenseComment(state.newExpenseComment, action),
		newExpenseCategory: newExpenseCategory(state.newExpenseCategory, action),
		currentMonthGeneralInfo: currentMonthGeneralInfo(state.currentMonthGeneralInfo, action),
		monthLimits: monthLimits(state.monthLimits, action),
		expenseCategories: expenseCategories(state.expenseCategories, action),
		yearChartData: yearChartData(state.yearChartData, action),
		ui: ui(state.ui, action)
	});
};
export default budget;
