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
		default:
			return state;
	}
};
export default expenseComments;
