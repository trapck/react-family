import initialState from "../../../store/initial-state";
import actionTypes from "../../../actions/action-types";
import babelPolyfill from "babel-polyfill";
import isGeneralInfoRowCollapsed from "./general-info-row-collapsed-reducer";

export default (state = initialState.budget.ui, action = {}) => {
	return Object.assign({}, state, {
		isGeneralInfoRowCollapsed: isGeneralInfoRowCollapsed(state.isGeneralInfoRowCollapsed, action)
	});
};
