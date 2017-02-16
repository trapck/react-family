import React from "react";
import ReactDom from "react-dom";
import babelPolyfill from "babel-polyfill";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux";
import Routes from "./routes/routes";
import mockApi from "../other/mock-api";
import storeCreator from "./redux/store/store-creator";
import "../styles/styles.css";

// TODO: implement async current user request. Think about certain place, where make it
let currentUser = mockApi.getCurrentUser();
const store = storeCreator.create({
	currentUser
});

ReactDom.render(
	<Provider store = {store}>
		<Router history = {browserHistory} routes = {Routes}/>
	</Provider>,
	document.getElementById("app")
);
