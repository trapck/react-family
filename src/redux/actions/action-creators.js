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

const getExpenses = () => (dispatch) => {
	return mockApi.getExpenses().then(
		expenses => dispatch(setReceivedExpenses(expenses)),
		ex => {throw ex;}
	);
};
export {getExpenses};

const setReceivedExpenses = (expenses = []) => {
	return {
		type: actionTypes.SET_RECEIVED_EXPENSES,
		expenses
	};
};

const getCurrentMonthGeneralInfo = () => dispatch => {
	return mockApi.getCurrentMonthGeneralInfo().then(
		info => dispatch(setReceivedCurrentMonthGeneralInfo(info)),
		ex => {throw ex;}
	);
};
export {getCurrentMonthGeneralInfo};

const setReceivedCurrentMonthGeneralInfo = info => {
	return {
		type: actionTypes.SET_RECEIVED_CURRENT_MONTH_GENERAL_INFO,
		info
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

