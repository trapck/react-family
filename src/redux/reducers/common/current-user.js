import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const currentUser = (state = initialState.currentUser, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_CURRENT_USER:
			return {
				id: "a8b10cfc-c418-4141-b28e-b5f31e18a660",
				name: "Denis",
				nickName: "trap-ck"
			};
		default:
			return state;
	}
};
export default currentUser;
