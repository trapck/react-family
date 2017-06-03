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
	selectDisplayValues,
	getYearChartInfo
} from "./utils";

const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();

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
	return new Promise(res => {
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
		return new Promise(res => {
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
		return new Promise(res => {
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
		return new Promise(res => {
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
							if (month === currentMonth && year === currentYear) {
								addLimitToDb(month, year).then(
									limit => res([limit])
								);
							} else {
								res([]);
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
		return new Promise(res => {
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
		return new Promise(res => {
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
		return new Promise(res => {
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
		return new Promise(res => {
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
	},

	getYearChartInfo(monthCount = 12) {
		return new Promise((res, rej) => {
			getYearChartInfo(monthCount).then(
				response => res(response),
				ex => rej(ex)
			);
		});
	}
};

export default api;
