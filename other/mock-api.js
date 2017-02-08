"use strict";

let expenses = [
	{
		id: 1,
		title: "Title 1"
	},
	{
		id: 2,
		title: "Title 2"
	},
	{
		id: 3,
		title: "Title 3"
	}
];

const api = {
	getExpenses() {
		return expenses;
	}
};

export default api;
