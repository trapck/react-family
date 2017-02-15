"use strict";

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
		title: "Category22"
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

const dbData = {
	user: users,
	expenseCategory: expenseCategories,
	expense: expenses
};

const currentMonth = new Date().getMonth();

const api = {
	getUsers() {
		return new Promise((resolve, reject) => setTimeout(() =>resolve([...users]), 1000));
	},
	getCurrentUser() {
		return currentUser;
	},

	getExpenseCategories() {
		return new Promise((resolve, reject) => setTimeout(() => resolve([...expenseCategories]), 1000));
	},

	getExpenses() {
		return new Promise((resolve, reject) => setTimeout(() => resolve([...expenses]), 1000));
	},

	getCurrentMonthGeneralInfo() {
		const currentMonthExpenses = expenses.filter(
			expense => expense.date.getMonth() === currentMonth
		);
		let checkedCategories = [],
			result = [];
		currentMonthExpenses.forEach(
			(expense) => {
				if (checkedCategories.indexOf(expense.category) === -1) {
					checkedCategories.push(expense.category);
					result.push({
						category: expense.category,
						count: currentMonthExpenses.filter(item => item.category === expense.category).length,
						amount: currentMonthExpenses.
							filter(item => item.category === expense.category).
							reduce((total, item) => total + item.amount, 0)
					});
				}
			}
		);
		return new Promise((resolve, reject) => setTimeout(() => resolve([...result]), 1000));
	}
};

export default api;
