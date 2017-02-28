import React from "react";
import {Route, IndexRoute} from "react-router";
import App from "../components/app";
import BudgetPage from "../components/budget-page/budget-page";
import BudgetMain from "../components/budget-page/budget-main";
import BudgetHistory from "../components/budget-page/budget-history";
import BudgetSettings from "../components/budget-page/budget-settings";
import HomePage from "../components/home-page/home-page";
import Next from "../components/next/next";
import NotFoundPage from "../components/not-found-page/not-found-page";

export default (
	<Route path = "/" component = {App}>
		<IndexRoute component = {HomePage}/>
		<Route path = "budget" component = {BudgetPage}>
			<IndexRoute component = {BudgetMain}/>
			<Route path = "history" component = {BudgetHistory}/>
			<Route path = "settings" component = {BudgetSettings}>
				<Route path = "categories" component = {ExpenseCategoriesManager}/>
				<Route path = "limit" component = {ExpenseLimitManager}/>
			</Route>
		</Route>
		<Route path = "next" component = {Next}/>
		<Route path = "*" component = {NotFoundPage}/>
	</Route>
);
