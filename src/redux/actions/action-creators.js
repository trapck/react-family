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
const getExpenseCategories = () => {
	return {
		type: actionTypes.GET_EXPENSE_CATEGORIES
	};
};
export {getExpenseCategories};

const getExpenseComments = () => {
	return {
		type: actionTypes.GET_EXPENSE_COMMENTS
	};
};
export {getExpenseComments};

const getExpenses = (category = "", isLoadingToken = "") => dispatch => {
	dispatch(setIsLoading(isLoadingToken, true));
	return mockApi.getExpenses(category).then(
			expenses => {
			dispatch(setIsLoading(isLoadingToken, false));
			dispatch(setReceivedExpenses(expenses, category));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getExpenses};

const setReceivedExpenses = (expenses = [], category = "") => {
	return {
		type: actionTypes.SET_RECEIVED_EXPENSES,
		expenses,
		category
	};
};

const getCurrentMonthGeneralInfo = (category = "", isLoadingToken = "") => dispatch => {
	dispatch(setIsLoading(isLoadingToken, true));
	return mockApi.getCurrentMonthGeneralInfo(category).then(
			info => {
			dispatch(setIsLoading(isLoadingToken, false));
			dispatch(setReceivedCurrentMonthGeneralInfo(info, category));
		},
			ex => rejectCallback(ex, isLoadingToken, dispatch)
	);
};
export {getCurrentMonthGeneralInfo};

const setReceivedCurrentMonthGeneralInfo = (info, category = "") => {
	return {
		type: actionTypes.SET_RECEIVED_CURRENT_MONTH_GENERAL_INFO,
		info,
		category
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

const getMonthExpenseLimits = (isLoadingToken, month, year) => dispatch => {
	dispatch(setIsLoading(isLoadingToken, true));
	return mockApi.getMonthExpenseLimits().then(
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
