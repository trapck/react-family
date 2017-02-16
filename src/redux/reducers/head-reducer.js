import {combineReducers} from "redux";
import currentUser from "./common/current-user-reducer";
import users from "./common/users-reducer";
import budget from "./budget/budget-main-reducer";
import staticData from "./static-data";
import isLoading from "./common/is-loading-reducer";

const headReducer = combineReducers({
	staticData,
	currentUser,
	users,
	budget,
	isLoading
});
export default headReducer;
