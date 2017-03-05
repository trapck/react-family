import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const expenseLimitsReducer = (state = initialState.monthLimits, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_RECEIVED_MONTH_EXPENSE_LIMITS: {
			let newLimits = [...action.limits];
			for(let limit of state) {
				if (!action.limits.filter(l => l.month === limit.month && l.year === limit.year).length) {
					newLimits.push(...limit);
				}
			}
			return newLimits;
		}
		case actionTypes.REGISTER_UPDATED__MONTH_EXPENSE_LIMIT_IN_STATE:
			return [...state.filter(e => action.limits.map(e => e.id).indexOf(e.id) === -1), ...action.limits];
		default:
			return state;
	}
};
export default expenseLimitsReducer;
