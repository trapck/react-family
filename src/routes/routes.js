import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "../components/app";
import BudgetPage from "../components/budget-page/budget-page";
import HomePage from "../components/home-page/home-page";
import Next from "../components/next/next";

export default (
	<Route path = "/" component = {App}>
		<IndexRoute component = {HomePage}/>
		<Route path = "budget" component = {BudgetPage}/>
		<Route path = "next" component = {Next}/>
	</Route>
);
