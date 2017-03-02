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
		monthExpenseLimits: [],
		expenseComments: [],
		expenses: [],
		currentMonthGeneralInfo: [],
		monthLimits: [],
		newExpense: {
			date: new Date()
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
