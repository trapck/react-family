import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const isLoading = (state = initialState.isLoading, action = {}) => {
	switch (action.type) {
		case actionTypes.SET_IS_LOADING:
			return Object.assign({}, state, {[action.token]: action.value});
		case actionTypes.REMOVE_IS_LOADING: {
			let result = Object.assign({}, state);
			delete result[action.token];
			return result;
		}
		default:
			return state;
	}
};
export default isLoading;
