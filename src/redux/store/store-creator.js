import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import headReducer from "../reducers/head-reducer";
import initialState from "./initial-state";

export default {
	create(state = {}) {
		return createStore(
			headReducer,
			Object.assign({}, initialState, state),
			applyMiddleware(
				thunkMiddleware
			)
		);
	}
};
