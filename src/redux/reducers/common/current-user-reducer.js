import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const currentUser = (state = initialState.currentUser, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_USER:
			return action.user;
		default:
			return state;
	}
};
export default currentUser;
