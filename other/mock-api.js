"use strict";

import guid from "uuid/v4";
import {
	createObjectWithDisplayValues,
	createFilterFunction,
	getValueByColumnType,
	findRelatedEntities,
	getDbBranchFromServer,
	postDbBranchToServer,
	syncDb,
	selectDisplayValues
} from "./utils";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

/*let users = [
 {
 "id": "a8b10cfc-c418-4141-b28e-b5f31e18a660",
 "name": "Denis",
 "nickName": "trap-ck"
 },
 {
 "id": "187a85fe-4197-40c3-9e9c-9f238816dbc4",
 "name": "Inna",
 "nickName": "emma"
 },
 {
 "id": "889baa49-4ed7-4366-9f45-7ad339f37422",
 "name": "Alisa",
 "nickName": "Lisa"
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
 title: "Category1",
 isNotVisibleInList: false
 },
 {
 id: "e51395b9-22f4-4d96-8efb-94d50181acc7",
 title: "Category22",
 isNotVisibleInList: true
 },
 {
 id: "b5f515f8-1a45-418d-95b6-41c5cfe71920",
 title: "Category333",
 isNotVisibleInList: false
 }
 ];

 let expenses = [
 {
 id : "516ec29f-6a7b-4b1f-a549-b6b8b7e76624",
 title: "Expense1",
 category: "27c78078-9f41-45d9-90dd-ad8d7a437fa2", // Cat1
 amount: 100,
 date: new Date(new Date().setHours(0, 0, 0, 0)),
 author: "a8b10cfc-c418-4141-b28e-b5f31e18a660", // Denis
 description: "Description1"
 },
 {
 id : "355f0905-6bd2-4ecb-976a-eaa693dd9c44",
 title: "Expense2",
 category: "e51395b9-22f4-4d96-8efb-94d50181acc7", // Cate22
 amount: 100,
 date: new Date(new Date().setHours(0, 0, 0, 0)),
 author: "187a85fe-4197-40c3-9e9c-9f238816dbc4", // Inna
 description: "Description2"
 },
 {
 id : "1908ae46-838c-4c54-9686-804f2d4c54af",
 title: "Expense3",
 category: "e51395b9-22f4-4d96-8efb-94d50181acc7", // cate22
 amount: 100,
 date: new Date(new Date().setHours(0, 0, 0, 0)),
 author: "187a85fe-4197-40c3-9e9c-9f238816dbc4", // Inna
 description: "Description3"
 },
 {
 id : "567b8c5e-ab65-40c2-952d-5665575a514d",
 title: "Expense4",
 category: "b5f515f8-1a45-418d-95b6-41c5cfe71920", // cate333
 amount: 100,
 date: new Date(new Date().setHours(0, 0, 0, 0)),
 author: "889baa49-4ed7-4366-9f45-7ad339f37422", // Alisa
 description: "Description4"
 },
 {
 id : "ed623722-154c-41db-9470-c920f0a7207d",
 title: "Expense5",
 category: "b5f515f8-1a45-418d-95b6-41c5cfe71920", // Cate333
 amount: 100,
 date: new Date(new Date().setHours(0, 0, 0, 0)),
 author: "889baa49-4ed7-4366-9f45-7ad339f37422", // Alisa
 description: "Description5"
 },
 {
 id : "f76d1e1e-1747-4d19-8cd5-345ce2f13993",
 title: "Expense6",
 category: "b5f515f8-1a45-418d-95b6-41c5cfe71920", // Cate 333
 amount: 100,
 date: new Date(new Date().setHours(0, 0, 0, 0)),
 author: "a8b10cfc-c418-4141-b28e-b5f31e18a660", // Denis
 description: "Description6"
 }
 ];

 let monthExpenseLimits = [
 {
 id: "78217de4-0960-467b-b7f8-3f7b0db76df3",
 income: 200,
 limit: 150,
 month:currentMonth - 2,
 year: currentYear
 },
 {
 id: "d0b2cd82-786c-40a5-87c0-bd16af13e6f6",
 income: 2000,
 limit: 1500,
 month:currentMonth - 1,
 year: currentYear
 },
 {
 id: "3ddd0612-8a11-4fd4-96f8-91ede2789f94",
 income: 20000,
 limit: 15000,
 month:currentMonth,
 year: currentYear
 }
 ];*/

let dbData = {
	user: [],
	expenseCategory: [],
	expense: [],
	monthExpenseLimit: []
};

//TODO: implement correct sync db error handling

const addLimitToDb = (month, year) => {
	const entityName = "monthExpenseLimit";
	let limit = {
		id: guid(),
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
	let newLimits = [...dbData.monthExpenseLimit, limit];
	return new Promise((res, rej) => {
		postDbBranchToServer(entityName, newLimits).then(
			response => {
				if (response.success) {
					dbData.monthExpenseLimit = newLimits;
				}
				res(limit);
			}
		);
	});
};

const api = {
	getCurrentUser() {
		return new Promise((res, rej) => {
			getDbBranchFromServer("user").then(
				({user}) => {
					let fakeUser = {
						id: "a8b10cfc-c418-4141-b28e-b5f31e18a660",
						name: "Denis",
						nickName: "trap-ck"
					};
					syncDb("user", user, dbData);
					selectDisplayValues([
						{
							name: "user",
							entities: [fakeUser]
						}
					], dbData).then(() => res(createObjectWithDisplayValues("user", fakeUser, dbData)));
				}
			);
		});
	},

	getEntities(entityName, filters = []) {
		return new Promise((res, rej) => {
			getDbBranchFromServer(entityName).then(
				response => {
					syncDb(entityName, response[entityName], dbData);
					let entities = dbData[entityName].filter(createFilterFunction(entityName, filters));
					selectDisplayValues([
						{
							name: entityName,
							entities
						}
					], dbData).then(() => res([...entities.map(e => createObjectWithDisplayValues(entityName, e, dbData))]));
				}
			);
		});
	},

	getMonthGeneralInfo(filters = []) {
		const entityName = "expense";
		return new Promise((res, rej) => {
			getDbBranchFromServer(entityName).then(
				response => {
					syncDb(entityName, response[entityName], dbData);
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
					selectDisplayValues([
						{
							name: "expense",
							entities: result
						}
					], dbData).then(() => res([...result.map(e => createObjectWithDisplayValues("expense", e, dbData))]));
				}
			);
		});
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

	getMonthExpenseLimits(filters = []) {
		const entityName = "monthExpenseLimit";
		return new Promise((res, rej) => {
			getDbBranchFromServer(entityName).then(
				response => {
					syncDb(entityName, response[entityName], dbData);
					let limits = dbData.monthExpenseLimit.filter(createFilterFunction("monthExpenseLimit", filters));
					if (!limits.length) {
						if (filters && filters.filter(f => f.column === "month" || f.column === "year").length === 2) {
							let month = filters.filter(f => f.column === "month")[0].value,
								year = filters.filter(f => f.column === "year")[0].value;
							if (!Number.isNaN(month - year)) {
								addLimitToDb(month, year).then(
									limit => res([limit])
								);
							} else {
								rej("error format");
							}
						} else {
							rej("error format");
						}
					} else {
						res(limits);
					}
				}
			);
		});
	},

	getDropDownList(column, filters, includeColumns) {
		return new Promise((res, rej) => {
			this.getEntities(column.linkTo.entityName, filters).then(
				() => {
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
					res(options);
				}
			);
		});
	},

	addEntities(entityName, entities) {
		let addedEntities = [],
			oldData = [...dbData[entityName]];
		for (let entity of entities) {
			let newEntity = {
				id: guid()
			};
			for (let column in entity) {
				newEntity[column] = getValueByColumnType(entityName, column, entity[column]);
			}
			dbData[entityName].push(Object.assign({}, newEntity));
			addedEntities.push(Object.assign({}, newEntity));
		}
		return new Promise((res, rej) => {
			postDbBranchToServer(entityName, dbData[entityName]).then(
				response => {
					if (!response.success) {
						dbData[entityName] = oldData;
						addedEntities = [];
					}
					selectDisplayValues([
						{
							name: entityName,
							entities: addedEntities
						}
					], dbData).then(() => res([...addedEntities.map(e => createObjectWithDisplayValues(entityName, e, dbData))]));
				}
			);
		});
	},

	/**
	 * Updates entity by array of columnMap objects
	 * @param {string} entityName
	 * @param {Object[]} updateMap
	 * @param {string} updateMap[].id
	 * @param {Object[]} updateMap[].values
	 * @param {string} updateMap[].values[].columnName
	 * @param {string|number|object|boolean} updateMap[].values[].columnValue
	 * @returns {Promise}
	 */

	updateEntitiesByColumnMap(entityName, updateMap) {
		let updatedEntities = [],
			oldData = [...dbData[entityName]];
		for (let entity of updateMap) {
			let dbEntity = dbData[entityName].filter(e => e.id === entity.id)[0];
			if (dbEntity) {
				for (let value of entity.values) {
					if (dbEntity.hasOwnProperty(value.columnName)) {
						dbEntity[value.columnName] = getValueByColumnType(entityName, value.columnName, value.columnValue);
					}
				}
				updatedEntities.push(Object.assign({}, dbEntity));
			}
		}
		return new Promise((res, rej) => {
			postDbBranchToServer(entityName, dbData[entityName]).then(
				response => {
					if (!response.success) {
						dbData[entityName] = oldData;
						updatedEntities = [];
					}
					selectDisplayValues([
						{
							name: entityName,
							entities: updatedEntities
						}
					], dbData).then(() => res([...updatedEntities.map(e => createObjectWithDisplayValues(entityName, e, dbData))]));

				}
			);
		});
	},

	deleteEntities(entityName, filters = []) {
		return new Promise((res, rej) => {
			this.getEntities(entityName, filters).then(
				() => {
					let entities = dbData[entityName].filter(createFilterFunction("expense", filters)),
						allRelatedEntities = [],
						notDeleted = [],
						oldData = [...dbData[entityName]];
					for (let e of entities) {
						let relatedEntities = findRelatedEntities(entityName, e.id, dbData);
						if (relatedEntities.length) {
							notDeleted.push(e);
							for (let r of relatedEntities) {
								if (allRelatedEntities.indexOf(r) === -1) {
									allRelatedEntities.push(r);
								}
							}
						}
					}
					let deleted = entities.filter(e => notDeleted.map(e => e.id).indexOf(e.id) === -1);
					dbData[entityName] = dbData[entityName].filter(e => deleted.map(e => e.id).indexOf(e.id) === -1);

					postDbBranchToServer(entityName, dbData[entityName]).then(
							response => {
							if (!response.success) {
								dbData[entityName] = oldData;
								deleted = [];
								notDeleted = [];
								allRelatedEntities = [];
							}
							res({
								deleted: [...deleted],
								notDeleted: [...notDeleted],
								relatedEntities: allRelatedEntities
							});
						}
					);
				}
			);
		});
	}
};

export default api;
