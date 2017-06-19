import actionTypes from "./action-types";
import mockApi from "../../../other/mock-api";
import {
	getCantDeleteByIntegrityConstraintMessage,
	setEntityDefaultValues
	} from "../../../other/utils";

const rejectCallback = (ex, isLoadingToken, dispatch) => {
	dispatch(setIsLoading({isLoadingToken ,value: false}));
	throw ex;
};

// Common actions

const setIsLoading = ({isLoadingToken, value}) => {
	return {
		type: actionTypes.SET_IS_LOADING,
		isLoadingToken,
		value
	};
};
export {setIsLoading};


const removeIsLoading = ({isLoadingToken}) => {
	return {
		type: actionTypes.REMOVE_IS_LOADING,
		isLoadingToken
	};
};
export {removeIsLoading};

const getUsers = () => {
	return dispatch => {
		return mockApi.getEntities("user").then(
				users => dispatch(setReceivedUsers({users}),
					ex => rejectCallback(ex)
			)
		);
	};
};
export {getUsers};

const setReceivedUsers = ({users = []}) => {
	return {
		type: actionTypes.SET_RECEIVED_USERS,
		users
	};
};
export {setReceivedUsers};


const getCurrentUser = () => dispatch => {
	return mockApi.getCurrentUser().then(
			user => {
			dispatch(setCurrentUser({user}));
		},
			ex => rejectCallback(ex)
	);
};
export {getCurrentUser};

const setCurrentUser = ({user}) => {
	return {
		type: actionTypes.SET_CURRENT_USER,
		user
	};
};

// Budget actions
const setCurrentMonth = ({number}) => {
	return {
		type: actionTypes.SET_CURRENT_MONTH,
		number
	};
};
export {setCurrentMonth};

const setCurrentYear = ({year}) => {
	return {
		type: actionTypes.SET_CURRENT_YEAR,
		year
	};
};
export {setCurrentYear};


const getExpenseCategories = ({filters = [], isLoadingToken = ""}) => dispatch => {
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.getEntities("expenseCategory", filters).then(
			categories => {
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(setReceivedExpenseCategories({categories, filters}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getExpenseCategories};

const setReceivedExpenseCategories = ({categories = [], filters = []}) => {
	return {
		type: actionTypes.SET_RECEIVED_EXPENSE_CATEGORIES,
		categories,
		filters
	};
};

const getExpenses = ({filters = [], isLoadingToken = ""}) => dispatch => {
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.getEntities("expense", filters).then(
			expenses => {
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(setReceivedExpenses({expenses, filters}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getExpenses};

const setReceivedExpenses = ({expenses = [], filters = []}) => {
	return {
		type: actionTypes.SET_RECEIVED_EXPENSES,
		expenses,
		filters
	};
};

const getCurrentMonthGeneralInfo = ({
	filters = [],
	isLoadingToken = "",
	currentMonth = new Date().getMonth(),
	currentYear = new Date().getFullYear()
	}) => dispatch => {
	filters = [
		...filters,
		{
			column: "date",
			value: {
				M: currentMonth,
				Y: currentYear
			}
		}
	];
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.getMonthGeneralInfo(filters).then(
			info => {
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(setReceivedCurrentMonthGeneralInfo({info, filters}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getCurrentMonthGeneralInfo};

const setReceivedCurrentMonthGeneralInfo = ({info, filters = []}) => {
	return {
		type: actionTypes.SET_RECEIVED_CURRENT_MONTH_GENERAL_INFO,
		info,
		filters
	};
};

const getYearChartData = ({monthCount = 12, isLoadingToken = ""}) => dispatch => {
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.getYearChartInfo(monthCount).then(
			data => {
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(setReceivedYearChartData({data}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getYearChartData};

const setReceivedYearChartData = ({data = []}) => {
	return {
		type: actionTypes.SET_RECEIVED_YEAR_CHART_DATA,
		data
	};
};

const addExpenseToCurrentMonthGeneralInfo = ({expense}) => {
	return {
		type: actionTypes.ADD_EXPENSE_TO_MONTH_GENERAL_INFO,
		expense
	};
};
export {addExpenseToCurrentMonthGeneralInfo};

const setGeneralInfoGroupCollapsed = ({key, isCollapsed}) => {
	return {
		type: actionTypes.SET_GENERAL_INFO_GROUP_COLLAPSED,
		key,
		isCollapsed
	};
};
export {setGeneralInfoGroupCollapsed};

const getMonthExpenseLimits = ({filters = [], isLoadingToken = ""}) => dispatch => {
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.getMonthExpenseLimits(filters).then(
			limits => {
			dispatch(setReceivedMonthExpenseLimits({limits}));
			dispatch(setIsLoading({isLoadingToken,value: false}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getMonthExpenseLimits};

const setReceivedMonthExpenseLimits = ({limits}) => {
	return {
		type: actionTypes.SET_RECEIVED_MONTH_EXPENSE_LIMITS,
		limits
	};
};

const updateMonthExpenseLimit = ({updateMap, isLoadingToken = ""}) => dispatch =>{
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.updateEntitiesByColumnMap("monthExpenseLimit", updateMap).then(
			limits => {
			// TODO: implement nice information window
			if (updateMap.length !== limits.length) {
				alert(`${updateMap.length - limits.length} of ${updateMap.length} were not updated`);
			}
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(registerUpdatedMonthExpenseLimitsInState({limits}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {updateMonthExpenseLimit};

const registerUpdatedMonthExpenseLimitsInState = ({limits}) => {
	return {
		type: actionTypes.REGISTER_UPDATED__MONTH_EXPENSE_LIMIT_IN_STATE,
		limits
	};
};
export {registerUpdatedMonthExpenseLimitsInState};

const addNewExpense = ({
	expense,
	isLoadingToken = "",
	currentMonth = new Date().getMonth(),
	currentYear = new Date().getFullYear()
	}) => dispatch => {
	expense = Object.assign({}, setEntityDefaultValues("expense"), expense);
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.addEntities("expense", [expense]).then(
			expenses => {
			if (!expenses.length) {
				alert("Expense was not added");
			} else {
				dispatch(registerNewExpenseInState({expense: expenses[0]}));
				if (
					new Date(expenses[0].date).getMonth() === currentMonth &&
					new Date(expenses[0].date).getFullYear() === currentYear
				) {
					dispatch(addExpenseToCurrentMonthGeneralInfo({expense: expenses[0]}));
				}
			}
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(clearNewExpense());
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {addNewExpense};

const registerNewExpenseInState = ({expense}) => {
	return {
		type: actionTypes.REGISTER_NEW_EXPENSE_IN_STATE,
		expense
	};
};
export {registerNewExpenseInState};

const newExpenseChange = ({column, value, e}) => {
	return {
		type: actionTypes.NEW_EXPENSE_CHANGE,
		column,
		value,
		e
	};
};
export {newExpenseChange};

const clearNewExpense = () => {
	return {
		type: actionTypes.CLEAR_NEW_EXPENSE
	};
};
export {clearNewExpense};

const updateExpense = ({
	updateMap = [],
	isLoadingToken = "",
	currentMonth = new Date().getMonth(),
	currentYear = new Date().getFullYear()
	}) => dispatch => {
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.updateEntitiesByColumnMap("expense", updateMap).then(
			expenses => {
			// TODO: implement nice information window
			if (updateMap.length !== expenses.length) {
				alert(`${updateMap.length - expenses.length} of ${updateMap.length} were not updated`);
			}
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(registerUpdatedExpenseInState({expenses}));
			dispatch(getCurrentMonthGeneralInfo({currentMonth, currentYear}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {updateExpense};

const registerUpdatedExpenseInState = ({expenses}) => {
	return {
		type: actionTypes.REGISTER_UPDATED_EXPENSE_IN_STATE,
		expenses
	};
};
export {registerUpdatedExpenseInState};

const deleteExpense = ({
	filters,
	isLoadingToken = "",
	currentMonth = new Date().getMonth(),
	currentYear = new Date().getFullYear()
	}) => dispatch => {
	//TODO: implement nice filters validation
	if (!filters) {
		alert("Filters are empty !");
		return;
	}
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.deleteEntities("expense", filters).then(
			result => {
			// TODO: implement info about number of deleted items, duplicate info for insert/update
			dispatch(setIsLoading({isLoadingToken,value: false}));
			if (result.notDeleted.length) {
				alert(getCantDeleteByIntegrityConstraintMessage(result));
			}
			if (result.deleted.length) {
				dispatch(removeDeletedExpensesFromState({deletedIds: result.deleted.map(c => c.id)}));
				dispatch(getCurrentMonthGeneralInfo({currentMonth, currentYear}));
			} else {
				return Promise.reject();
			}
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {deleteExpense};

const removeDeletedExpensesFromState = ({deletedIds = []}) => {
	return {
		type: actionTypes.REMOVE_DELETED_EXPENSES_FROM_STATE,
		deletedIds
	};
};
export {removeDeletedExpensesFromState};


const addNewExpenseCategory = ({expenseCategory, isLoadingToken = ""}) => dispatch => {
	expenseCategory = Object.assign({}, setEntityDefaultValues("expenseCategory"), expenseCategory);
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.addEntities("expenseCategory", [expenseCategory]).then(
			expenseCategories => {
			// TODO: implement nice information window
			if (!expenseCategories.length) {
				alert("Expense category was not added");
			}
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(registerNewExpenseCategoryInState({expenseCategory: expenseCategories[0]}));
			dispatch(clearNewExpenseCategory());
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {addNewExpenseCategory};

const registerNewExpenseCategoryInState = ({expenseCategory}) => {
	return {
		type: actionTypes.REGISTER_NEW_EXPENSE_CATEGORY_IN_STATE,
		expenseCategory
	};
};
export {registerNewExpenseCategoryInState};

const newExpenseCategoryChange = ({column, value, e}) => {
	return {
		type: actionTypes.NEW_EXPENSE_CATEGORY_CHANGE,
		column,
		value,
		e
	};
};
export {newExpenseCategoryChange};

const clearNewExpenseCategory = () => {
	return {
		type: actionTypes.CLEAR_NEW_EXPENSE_CATEGORY
	};
};
export {clearNewExpenseCategory};

const updateExpenseCategory = ({updateMap, isLoadingToken = ""}) => dispatch =>{
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.updateEntitiesByColumnMap("expenseCategory", updateMap).then(
			expenseCategories => {
			// TODO: implement nice information window
			if (updateMap.length !== expenseCategories.length) {
				alert(`${updateMap.length - expenseCategories.length} of ${updateMap.length} were not updated`);
			}
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(registerUpdatedExpenseCategoryInState({expenseCategories}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {updateExpenseCategory};

const registerUpdatedExpenseCategoryInState = ({expenseCategories}) => {
	return {
		type: actionTypes.REGISTER_UPDATED_EXPENSE_CATEGORY_IN_STATE,
		expenseCategories
	};
};
export {registerUpdatedExpenseCategoryInState};

const deleteExpenseCategory = ({
	filters,
	isLoadingToken = "",
	currentMonth = new Date().getMonth(),
	currentYear = new Date().getFullYear()
	}) => dispatch => {
	//TODO: implement nice filters validation
	if (!filters) {
		alert("Filters are empty !");
		return;
	}
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.deleteEntities("expenseCategory", filters).then(
			result => {
			// TODO: implement info about number of deleted items, duplicate info for insert/update
			dispatch(setIsLoading({isLoadingToken,value: false}));
			if (result.notDeleted.length) {
				alert(getCantDeleteByIntegrityConstraintMessage(result));
			}
			if (result.deleted.length) {
				dispatch(removeDeletedExpenseCategoriesFromState({deletedIds: result.deleted.map(c => c.id)}));
				dispatch(getCurrentMonthGeneralInfo({currentMonth, currentYear}));
			} else {
				return Promise.reject();
			}
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {deleteExpenseCategory};

const removeDeletedExpenseCategoriesFromState = ({deletedIds = []}) => {
	return {
		type: actionTypes.REMOVE_DELETED_EXPENSE_CATEGORY_FROM_STATE,
		deletedIds
	};
};
export {removeDeletedExpenseCategoriesFromState};


const toggleNewExpenseVisible = () => {
	return {
		type: actionTypes.TOGGLE_NEW_EXPENSE_VISIBLE
	};
};
export {toggleNewExpenseVisible};

const toggleNewExpenseCategoryVisible = () => {
	return {
		type: actionTypes.TOGGLE_NEW_EXPENSE_CATEGORY_VISIBLE
	};
};
export {toggleNewExpenseCategoryVisible};

const toggleShowCurrentMonthLimitOnly = () => {
	return {
		type: actionTypes.TOGGLE_SHOW_CURRENT_MONTH_LIMIT_ONLY
	};
};
export {toggleShowCurrentMonthLimitOnly};


const getExpenseComments = ({filters = [], isLoadingToken = ""}) => dispatch => {
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.getEntities("expenseComment", filters).then(
			expenseComments => {
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(setReceivedExpenseComments({expenseComments, filters}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getExpenseComments};

const setReceivedExpenseComments = ({expenseComments = []}) => {
	return {
		type: actionTypes.SET_RECEIVED_EXPENSE_COMMENTS,
		expenseComments
	};
};
export {setReceivedExpenseComments};

const addNewExpenseComment = ({
	expenseComment,
	isLoadingToken = ""
	}) => dispatch => {
	expenseComment = Object.assign(
		{}, setEntityDefaultValues("expenseComment"), expenseComment);
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.addEntities("expenseComment", [expenseComment]).then(
			expenseComments => {
			if (!expenseComments.length) {
				alert("Expense Comment was not added");
			} else {
				dispatch(registerNewExpenseCommentInState({expenseComment: expenseComments[0]}));
			}
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(clearNewExpenseComment());
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {addNewExpenseComment};

const registerNewExpenseCommentInState = ({expenseComment}) => {
	return {
		type: actionTypes.REGISTER_NEW_EXPENSE_COMMENT_IN_STATE,
		expenseComment
	};
};
export {registerNewExpenseCommentInState};

const newExpenseCommentChange = ({column, value, e}) => {
	return {
		type: actionTypes.NEW_EXPENSE_COMMENT_CHANGE,
		column,
		value,
		e
	};
};
export {newExpenseCommentChange};

const clearNewExpenseComment = () => {
	return {
		type: actionTypes.CLEAR_NEW_EXPENSE_COMMENT
	};
};
export {clearNewExpenseComment};


const updateExpenseComment = ({updateMap, isLoadingToken = ""}) => dispatch =>{
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.updateEntitiesByColumnMap("expenseComment", updateMap).then(
			expenseComments => {
			// TODO: implement nice information window
			if (updateMap.length !== expenseComments.length) {
				alert(`${updateMap.length - expenseComments.length} of ${updateMap.length} were not updated`);
			}
			dispatch(setIsLoading({isLoadingToken,value: false}));
			dispatch(registerUpdatedExpenseCommentInState({expenseComments}));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {updateExpenseComment};

const registerUpdatedExpenseCommentInState = ({expenseComments}) => {
	return {
		type: actionTypes.REGISTER_UPDATED_EXPENSE_COMMENT_IN_STATE,
		expenseComments
	};
};
export {registerUpdatedExpenseCommentInState};

const deleteExpenseComment = ({
	filters,
	isLoadingToken = "",
	currentMonth = new Date().getMonth(),
	currentYear = new Date().getFullYear()
	}) => dispatch => {
	//TODO: implement nice filters validation
	if (!filters) {
		alert("Filters are empty !");
		return;
	}
	dispatch(setIsLoading({isLoadingToken,value: true}));
	return mockApi.deleteEntities("expenseComment", filters).then(
			result => {
			// TODO: implement info about number of deleted items, duplicate info for insert/update
			dispatch(setIsLoading({isLoadingToken,value: false}));
			if (result.notDeleted.length) {
				alert(getCantDeleteByIntegrityConstraintMessage(result));
			}
			if (result.deleted.length) {
				dispatch(removeDeletedExpenseCommentFromState({deletedIds: result.deleted.map(c => c.id)}));
			} else {
				return Promise.reject();
			}
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {deleteExpenseComment};

const removeDeletedExpenseCommentFromState = ({deletedIds = []}) => {
	return {
		type: actionTypes.REMOVE_DELETED_EXPENSE_COMMENT_FROM_STATE,
		deletedIds
	};
};
export {removeDeletedExpenseCommentFromState};
