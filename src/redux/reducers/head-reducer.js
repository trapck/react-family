import {combineReducers} from "redux";
import currentUser from "./common/current-user-reducer";
import users from "./common/users-reducer";
import budget from "./budget/budget-main-reducer.js";

const headReducer = combineReducers({
	currentUser,
	users,
	budget
});
export default headReducer;
