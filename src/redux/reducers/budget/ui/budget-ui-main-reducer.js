import initialState from "../../../store/initial-state";
import actionTypes from "../../../actions/action-types";
import isGeneralInfoRowCollapsed from "./general-info-row-collapsed-reducer";
import isNewExpenseVisible from "./toggle-new-expense-visible-reducer";

export default (state = initialState.budget.ui, action = {}) => {
	return Object.assign({}, state, {
		isGeneralInfoRowCollapsed: isGeneralInfoRowCollapsed(state.isGeneralInfoRowCollapsed, action),
		isNewExpenseVisible: isNewExpenseVisible(state.isNewExpenseVisible, action)
	});
};
