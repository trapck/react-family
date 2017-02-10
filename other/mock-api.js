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

const api = {
	getExpenses() {
		return expenses;
	},
	getUsers() {
		return new Promise(
			(resolve, reject) => {
				setTimeout(() => {
					resolve([...users]);
				}, 2000);
			}
		);
	},
	getCurrentUser() {
		return currentUser;
	}
};

export default api;
