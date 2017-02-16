import entityStructure from "../../static-data/entity-info/entity-sctructure";
import months from "../../static-data/months";

export default {
	staticData: {
		entityStructure,
		months: months.data
	},
	users: [],
	currentUser: {},
	budget: {
		expenseCategories: [],
		monthExpenseLimits: [],
		expenseComments: [],
		expenses: [],
		currentMonthGeneralInfo: [],
		ui: {
			isGeneralInfoRowCollapsed: {}
		}
	}
};
