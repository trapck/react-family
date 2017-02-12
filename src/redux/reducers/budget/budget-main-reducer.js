import babelPolyfill from "babel-polyfill";
import initialState from "../../store/initial-state";
import expenses from "./expenses-reducer";

const budget = (state = initialState.budget, action = {}) => {
	return Object.assign({}, state, {
		expenses: expenses(state.expenses, action)
	});
};
export default budget;
