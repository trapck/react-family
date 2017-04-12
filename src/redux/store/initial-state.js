import entityStructure from "../../static-data/entity-info/entity-sctructure";
import months from "../../static-data/months";

export default {
	staticData: {
		entityStructure,
		months: months.data
	},
	users: [],
	currentUser: {},
	isLoading: {},
	budget: {
		expenseCategories: [],
		expenseComments: [],
		expenses: [],
		currentMonthGeneralInfo: [],
		monthLimits: [],
		newExpense: {
			date: new Date(new Date().setHours(0, 0, 0, 0))
		},
		newExpenseCategory: {
			isNotVisibleInList: false
		},
		yearChartData: [],
		ui: {
			isGeneralInfoRowCollapsed: {},
			isNewExpenseVisible: false,
			isNewExpenseCategoryVisible: false,
			isShowCurrentMonthLimitOnly: true,
			currentMonth: months.data.filter(m => m.number === new Date().getMonth())[0],
			currentYear: new Date().getFullYear()
		}
	}
};
