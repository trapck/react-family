import initialState from "../../store/initial-state";
import actionTypes from "../../actions/action-types";

const expenseComments = (state = [], action = {}) => {
	switch (action.type) {
		case actionTypes.SET_RECEIVED_EXPENSE_COMMENTS:
		{
			let newComments = action.expenseComments || [];
			return state.filter(
				ec => newComments.map(c => c.id).indexOf(ec.id) === -1
			).concat(...newComments);
		}
		case actionTypes.REGISTER_NEW_EXPENSE_COMMENT_IN_STATE:
			return [...state, Object.assign({}, action.expenseComment)];
		case actionTypes.REGISTER_UPDATED_EXPENSE_COMMENT_IN_STATE:
			return [
				...state.filter(e => action.expenseComments.map(e => e.id).indexOf(e.id) === -1),
				...action.expenseComments
			];
		case actionTypes.REMOVE_DELETED_EXPENSE_COMMENT_FROM_STATE:
			return [...state.filter(e => action.deletedIds.indexOf(e.id) === -1)];
		default:
			return state;
	}
};
export default expenseComments;
