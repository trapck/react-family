import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";
const users = (state = initialState.users, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_RECEIVED_USERS:
					return action.users || [];
		default:
					return state;
	}
};
export default users;
