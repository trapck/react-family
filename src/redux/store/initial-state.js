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
			ui: {
	isGeneralInfoRowCollapsed: {},
	isNewExpenseVisible: false,
		isNewExpenseCategoryVisible: false
}
}
};
