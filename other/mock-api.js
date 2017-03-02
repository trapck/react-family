"use strict";
import {createObjectWithDisplayValues, createFilterFunction, getValueByColumnType} from "./utils";
import guid from "uuid/v4";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

let users = [
	{
		id: "a8b10cfc-c418-4141-b28e-b5f31e18a660",
		name: "Denis",
		nickName: "trap-ck"
	},
	{
		id: "187a85fe-4197-40c3-9e9c-9f238816dbc4",
		name: "Inna",
		nickName: "emma"
	},
	{
		id: "889baa49-4ed7-4366-9f45-7ad339f37422",
		name: "Alisa",
		nickName: "Lisa"
	}
];

let currentUser = {
	id: "a8b10cfc-c418-4141-b28e-b5f31e18a660",
	name: "Denis",
	nickName: "trap-ck"
};

let expenseCategories = [
	{
		id: "27c78078-9f41-45d9-90dd-ad8d7a437fa2",
		title: "Category1"
	},
	{
		id: "e51395b9-22f4-4d96-8efb-94d50181acc7",
		title: "Category22",
		isNotVisibleInList: true
	},
	{
		id: "b5f515f8-1a45-418d-95b6-41c5cfe71920",
		title: "Category333"
	}
];

let expenses = [
	{
		id : "516ec29f-6a7b-4b1f-a549-b6b8b7e76624",
		title: "Expense1",
		category: "27c78078-9f41-45d9-90dd-ad8d7a437fa2", // Cat1
		amount: 100,
		date: new Date(),
		author: "a8b10cfc-c418-4141-b28e-b5f31e18a660", // Denis
		description: "Description1"
	},
	{
		id : "355f0905-6bd2-4ecb-976a-eaa693dd9c44",
		title: "Expense2",
		category: "e51395b9-22f4-4d96-8efb-94d50181acc7", // Cate22
		amount: 100,
		date: new Date(Date.now() - 24 * 3600),
		author: "187a85fe-4197-40c3-9e9c-9f238816dbc4", // Inna
		description: "Description2"
	},
	{
		id : "1908ae46-838c-4c54-9686-804f2d4c54af",
		title: "Expense3",
		category: "e51395b9-22f4-4d96-8efb-94d50181acc7", // cate22
		amount: 100,
		date: new Date(Date.now() - 24 * 3600),
		author: "187a85fe-4197-40c3-9e9c-9f238816dbc4", // Inna
		description: "Description3"
	},
	{
		id : "567b8c5e-ab65-40c2-952d-5665575a514d",
		title: "Expense4",
		category: "b5f515f8-1a45-418d-95b6-41c5cfe71920", // cate333
		amount: 100,
		date: new Date(Date.now() - 2 * 24 * 3600),
		author: "889baa49-4ed7-4366-9f45-7ad339f37422", // Alisa
		description: "Description4"
	},
	{
		id : "ed623722-154c-41db-9470-c920f0a7207d",
		title: "Expense5",
		category: "b5f515f8-1a45-418d-95b6-41c5cfe71920", // Cate333
		amount: 100,
		date: new Date(Date.now() - 2 * 24 * 3600),
		author: "889baa49-4ed7-4366-9f45-7ad339f37422", // Alisa
		description: "Description5"
	},
	{
		id : "f76d1e1e-1747-4d19-8cd5-345ce2f13993",
		title: "Expense6",
		category: "b5f515f8-1a45-418d-95b6-41c5cfe71920", // Cate 333
		amount: 100,
		date: new Date(Date.now() - 2 * 24 * 3600),
		author: "a8b10cfc-c418-4141-b28e-b5f31e18a660", // Denis
		description: "Description6"
	}
];

let monthExpenseLimits = [
	{
		income: 200,
		limit: 150,
		month:currentMonth - 2,
		year: currentYear
	},
	{
		income: 2000,
		limit: 1500,
		month:currentMonth - 1,
		year: currentYear
	},
	{
		income: 20000,
		limit: 15000,
		month:currentMonth,
		year: currentYear
	}
];

let dbData = {
	user: users,
	expenseCategory: expenseCategories,
	expense: expenses,
	monthExpenseLimit: monthExpenseLimits
};

const addLimitToDb = (month, year) => {
	let limit = {
		month,
		year,
		income: 0,
		limit: 0
	};
	if (month === currentMonth && year === currentYear) {
		let lastMonth = dbData.monthExpenseLimit
			.filter(l =>
			(l.month === currentMonth - 1 && l.year === currentYear) ||
			(currentMonth === 0 && l.month === 11 && l.year === currentYear - 1))[0];
		if (lastMonth) {
			limit.income = lastMonth.income;
			limit.limit = lastMonth.limit;
		}
	}
	monthExpenseLimits.push(limit);
	return limit;
};

const api = {
	getUsers() {
		let users = dbData.user.map(u => createObjectWithDisplayValues("user", u, dbData));
		return new Promise((resolve, reject) => setTimeout(() =>resolve([...users]), 1000));
	},
	getCurrentUser() {
		return createObjectWithDisplayValues("user", currentUser, dbData);
	},

	getExpenseCategories(filters) {
		let expenseCategories = dbData.expenseCategory
			.filter(createFilterFunction("expenseCategory", filters))
			.map(ec => createObjectWithDisplayValues("expenseCategory", ec, dbData));
		return new Promise((resolve, reject) => setTimeout(() => resolve([...expenseCategories]), 1000));
	},

	getExpenses(filters) {
		let expenses = dbData.expense
			.filter(createFilterFunction("expense", filters))
			.map(e => createObjectWithDisplayValues("expense", e, dbData));
		return new Promise((resolve, reject) => setTimeout(() => resolve([...expenses]), 1000));
	},

	getMonthGeneralInfo(filters) {
		const expenses = dbData.expense.filter(createFilterFunction("expense", filters));
		let checkedCategories = [],
			result = [];
		expenses.forEach(
			(expense) => {
				if (checkedCategories.indexOf(expense.category) === -1) {
					checkedCategories.push(expense.category);
					result.push({
						category: expense.category,
						count: expenses.filter(item => item.category === expense.category).length,
						amount: expenses
							.filter(item => item.category === expense.category)
							.reduce((total, item) => total + item.amount, 0)
					});
				}
			}
		);
		result = result.map(e => createObjectWithDisplayValues("expense", e, dbData));
		return new Promise((resolve, reject) => setTimeout(() => resolve([...result]), 1000));
	},

	getCurrentMonthGeneralInfo(filters = []) {
		let newFilters = [...filters];
		newFilters.push({
			column: "date",
			value: {
				M: currentMonth,
				Y: currentYear
			}
		});
		return this.getMonthGeneralInfo(newFilters);
	},

	getMonthExpenseLimits(filters) {
		let limits = dbData.monthExpenseLimit.filter(createFilterFunction("monthExpenseLimit", filters));
		if (!limits.length) {
			if (filters && filters.filter(f => f.column === "month" || f.column === "year").length === 2) {
				let month = filters.filter(f => f.column === "month")[0].value,
					year = filters.filter(f => f.column === "year")[0].value;
				if (!Number.isNaN(month - year)) {
					limits = [addLimitToDb(month, year)];
				}
			}
		}
		return new Promise((resolve, reject) => setTimeout(() => resolve(limits), 1000));
	},

	getDropDownList(column, filters, includeColumns) {
		let options = dbData[column.linkTo.entityName]
			.filter(createFilterFunction(column.linkTo.entityName, filters))
			.filter(e => !e.isNotVisibleInList)
			.map(e => {
				let item = {
					value: e.id,
					label: e[column.linkTo.columnName].toString()
				};
				if (includeColumns) {
					for (let c of includeColumns) {
						item[c] = e[c];
					}
				}
				return item;
			});
		return new Promise((resolve, reject) => setTimeout(() => resolve(options), 1000));
	},

	addExpense(expense) {
		let newExpense = {
			id: guid()
		};
		for (let column in expense) {
			newExpense[column] = getValueByColumnType("expense", column, expense[column]);
		}
		dbData.expense.push(Object.assign({}, newExpense));
		return new Promise(
			(resolve, reject) =>
				setTimeout(
					() => resolve(
						Object.assign({}, createObjectWithDisplayValues("expense", newExpense, dbData))
					),
					1000)
		);
	},
	addExpenseCategory(expenseCategory) {
		let newExpenseCategory = {
			id: guid()
		};
		for (let column in expenseCategory) {
			newExpenseCategory[column] = getValueByColumnType("expenseCategory", column, expenseCategory[column]);
		}
		dbData.expenseCategory.push(Object.assign({}, newExpenseCategory));
		return new Promise(
			(resolve, reject) =>
				setTimeout(
					() => resolve(
						Object.assign({}, createObjectWithDisplayValues("expenseCategory", newExpenseCategory, dbData))
					),
					1000)
		);
	}
};

export default api;
