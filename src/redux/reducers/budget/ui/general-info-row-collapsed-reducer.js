import initialState from "../../../store/initial-state";
import actionTypes from "../../../actions/action-types";

export default (state = {}, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_GENERAL_INFO_GROUP_COLLAPSED:
					return Object.assign({}, state, {[action.key]: action.isCollapsed});
		default:
					return state;
	}
};
