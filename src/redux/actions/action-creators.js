import actionTypes from "./action-types";
import mockApi from "../../../other/mock-api";

const rejectCallback = (ex, isLoadingToken, dispatch) => {
	dispatch(setIsLoading(isLoadingToken, false));
	throw ex;
};

// Common actions

const setIsLoading = (token, value) => {
	return {
		type: actionTypes.SET_IS_LOADING,
		token,
		value
	};
};
export {setIsLoading};


const removeIsLoading = (token) => {
	return {
		type: actionTypes.REMOVE_IS_LOADING,
		token
	};
};
export {removeIsLoading};

const getUsers = () => {
	return dispatch => {
		return mockApi.getUsers().then(
			users => dispatch(setReceivedUsers(users),
				ex => rejectCallback(ex)
			)
		);
	};
};
export {getUsers};

const setReceivedUsers = (users = []) => {
	return {
		type: actionTypes.SET_RECEIVED_USERS,
		users
	};
};
export {setReceivedUsers};


const setCurrentUser = () => {
	return {
		type: actionTypes.SET_CURRENT_USER
	};
};
export {setCurrentUser};


// Budget actions
const getExpenseCategories = (filters = [], isLoadingToken = "") => dispatch => {
	dispatch(setIsLoading(isLoadingToken, true));
	return mockApi.getExpenseCategories(filters).then(
		categories => {
			dispatch(setIsLoading(isLoadingToken, false));
			dispatch(setReceivedExpenseCategories(categories, filters));
		},
		ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getExpenseCategories};

const setReceivedExpenseCategories = (categories = [], filters = []) => {
	return {
		type: actionTypes.SET_RECEIVED_EXPENSE_CATEGORIES,
		categories,
		filters
	};
};

const getExpenseComments = () => {
	return {
		type: actionTypes.GET_EXPENSE_COMMENTS
	};
};
export {getExpenseComments};

const getExpenses = (filters = [], isLoadingToken = "") => dispatch => {
	dispatch(setIsLoading(isLoadingToken, true));
	return mockApi.getExpenses(filters).then(
		expenses => {
			dispatch(setIsLoading(isLoadingToken, false));
			dispatch(setReceivedExpenses(expenses, filters));
		},
		ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getExpenses};

const setReceivedExpenses = (expenses = [], filters = []) => {
	return {
		type: actionTypes.SET_RECEIVED_EXPENSES,
		expenses,
		filters
	};
};

const getCurrentMonthGeneralInfo = (filters = [], isLoadingToken = "") => dispatch => {
	dispatch(setIsLoading(isLoadingToken, true));
	return mockApi.getCurrentMonthGeneralInfo(filters).then(
		info => {
			dispatch(setIsLoading(isLoadingToken, false));
			dispatch(setReceivedCurrentMonthGeneralInfo(info, filters));
		},
		ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getCurrentMonthGeneralInfo};

const addExpenseToCurrentMonthGeneralInfo = expense => {
	return {
		type: actionTypes.ADD_EXPENSE_TO_MONTH_GENERAL_INFO,
		expense
	};
};
export {addExpenseToCurrentMonthGeneralInfo};

const setReceivedCurrentMonthGeneralInfo = (info, filters = []) => {
	return {
		type: actionTypes.SET_RECEIVED_CURRENT_MONTH_GENERAL_INFO,
		info,
		filters
	};
};

const setGeneralInfoGroupCollapsed = (key, isCollapsed) => {
	return {
		type: actionTypes.SET_GENERAL_INFO_GROUP_COLLAPSED,
		key,
		isCollapsed
	};
};
export {setGeneralInfoGroupCollapsed};

const getMonthExpenseLimits = (filters = [], isLoadingToken = "") => dispatch => {
	dispatch(setIsLoading(isLoadingToken, true));
	return mockApi.getMonthExpenseLimits(filters).then(
		limits => {
			dispatch(setReceivedMonthExpenseLimits(limits));
			dispatch(setIsLoading(isLoadingToken, false));
		},
		ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getMonthExpenseLimits};

const setReceivedMonthExpenseLimits = (limits) => {
	return {
		type: actionTypes.SET_RECEIVED_MONTH_EXPENSE_LIMITS,
		limits
	};
};

const addNewExpense = (expense, isLoadingToken = "") => dispatch => {
	dispatch(setIsLoading(isLoadingToken, true));
	return mockApi.addExpense(expense).then(
		expense => {
			dispatch(setIsLoading(isLoadingToken, false));
			dispatch(registerNewExpenseInState(expense));
			dispatch(addExpenseToCurrentMonthGeneralInfo(expense));
			dispatch(clearNewExpense());
		},
		ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {addNewExpense};

const registerNewExpenseInState = expense => {
	return {
		type: actionTypes.REGISTER_NEW_EXPENSE_IN_STATE,
		expense
	};
};
export {registerNewExpenseInState};

const newExpenseChange = (column, value, e) => {
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


const toggleNewExpenseVisible = () => {
	return {
		type: actionTypes.TOGGLE_NEW_EXPENSE_VISIBLE
	};
};
export {toggleNewExpenseVisible};
