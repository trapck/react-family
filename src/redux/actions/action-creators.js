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

const getExpenses = () => {
	return {
		type: actionTypes.GET_EXPENSES
	};
};
export {getExpenses};

