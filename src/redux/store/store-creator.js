import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import headReducer from "../reducers/main";
import initialState from "./initial-state";
import babelPolyfill from "babel-polyfill";

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
