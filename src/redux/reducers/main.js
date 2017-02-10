import {combineReducers} from "redux";
import currentUser from "./common/current-user";
import users from "./common/users";

const headReducer = combineReducers({
	currentUser,
	users
});
export default headReducer;
