import entities from "../../static-data/entity-info/entities";
import entityColumnTypes from "../../static-data/entity-info/entity-column-types";
import entityColumns from "../../static-data/entity-info/entity-columns";
import entityRelations from "../../static-data/entity-info/entity-relations";
import months from "../../static-data/months";

export default {
	staticData: {
		entities,
		entityColumnTypes,
		entityColumns,
		entityRelations,
		months
	},
	users: [],
	currentUser: {},
	budget: {
		expenseCategories: [],
		monthExpenseLimits: [],
		expenseComments: [],
		expenses: [],
		currentMonthGeneralInfo: []
	}
};
