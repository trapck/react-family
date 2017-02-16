import actionTypes from "./action-types";
import mockApi from "../../../other/mock-api";

// Common actions

const getUsers = () => {
	return dispatch => {
		return mockApi.getUsers().then(
				users => dispatch(setReceivedUsers(users),
				ex => {throw ex;}
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

const getMonthExpenseLimits = () => {
	return {
		type: actionTypes.GET_MONTH_EXPENSE_LIMITS
	};
};
export {getMonthExpenseLimits};

const getExpenseComments = () => {
	return {
		type: actionTypes.GET_EXPENSE_COMMENTS
	};
};
export {getExpenseComments};

const getExpenses = (category) => (dispatch) => {
	return mockApi.getExpenses(category).then(
		expenses => dispatch(setReceivedExpenses(expenses, category)),
		ex => {throw ex;}
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

const getCurrentMonthGeneralInfo = (category = "") => dispatch => {
	return mockApi.getCurrentMonthGeneralInfo(category).then(
		info => dispatch(setReceivedCurrentMonthGeneralInfo(info, category)),
		ex => {throw ex;}
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

