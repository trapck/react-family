import React from "react";
import ReactDom from "react-dom";
import {Router, browserHistory} from "react-router";
import Routes from "./routes/routes";
import "../styles/styles.css";

ReactDom.render(
	<Router history = {browserHistory} routes = {Routes}/>,
	document.getElementById("app")
);
