import React from "react";
import ReactDom from "react-dom";
import babelPolyfill from "babel-polyfill";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux";
import Routes from "./routes/routes";
import mockApi from "../other/mock-api";
import storeCreator from "./redux/store/store-creator";
import "../node_modules/toastr/build/toastr.min.css";
import "../styles/styles.css";
// hello
const store = storeCreator.create();

ReactDom.render(
	<Provider store = {store}>
		<Router history = {browserHistory} routes = {Routes}/>
	</Provider>,
	document.getElementById("app")
);
