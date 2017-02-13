import {combineReducers} from "redux";
import babelPolyfill from "babel-polyfill";
import initialState from "../../store/initial-state";
import expenses from "./expenses-reducer";
import currentMonthGeneralInfo from "./current-month-info-reducer";
import ui from "./ui/budget-ui-main-reducer";

const budget = (state = initialState.budget, action = {}) => {
	return Object.assign({}, state, {
		expenses: expenses(state.expenses, action),
		currentMonthGeneralInfo: currentMonthGeneralInfo(state.currentMonthGeneralInfo, action),
		ui: ui(state.ui, action)
	});
};
export default budget;
