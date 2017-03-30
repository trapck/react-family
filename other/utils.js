import entityColumnTypes from "../src/static-data/entity-info/entity-column-types";
import entities from "../src/static-data/entity-info/entities";
import entityStructure from "../src/static-data/entity-info/entity-sctructure";
import entityRelations from "../src/static-data/entity-info/entity-relations";
import entityColumns from "../src/static-data/entity-info/entity-columns";
import comparisonTypes from "../src/static-data/comparison-types";


const getFormatedDate = (date) => {
	date = new Date(date);
	let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
		month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
		year = date.getFullYear();
	return `${day}.${month}.${year}`;
};
export {getFormatedDate};

const getEntityColumns = (entityName, ignoreColumns = []) => {
	return Object.keys(entityStructure[entityName].columns).
	filter(k => ignoreColumns.indexOf(k) === -1).
	map(k => entityStructure[entityName].columns[k]);
};
export {getEntityColumns};

const getEntityColumnsCaptions = (entityName, ignoreColumns = []) =>
	getEntityColumns(entityName, ignoreColumns).map(c => c.caption);
export {getEntityColumnsCaptions};

const getLookupDisplayValue = (value, entityName, columnName, dbData) => {
	const linkTo = entityStructure[entityName].columns[columnName].linkTo;
	return (dbData[linkTo.entityName].filter(v => v.id === value)[0] || {})[linkTo.columnName] || "";
};
export {getLookupDisplayValue};

// TODO: implement lookup data loading
const createObjectWithDisplayValues = (entityName, entity, dbData) => {
	let resultObject = Object.assign({displayValues: {}}, entity);
	for (let column in entity) {
		if ((entityStructure[entityName].columns[column] || {}).type === entityColumnTypes.LOOKUP) {
			resultObject.displayValues[column] = getLookupDisplayValue(entity[column], entityName, column, dbData);
		}
	}
	return resultObject;
};
export {createObjectWithDisplayValues};

const getDateColumnEqualityComparisonResult = (value, comparisonObject) => {
	value = new Date(value);
	let result = true;
	if (Number.isInteger(comparisonObject.D)) {
		result = value.getDate() === comparisonObject.D;
	}
	if (Number.isInteger(comparisonObject.M)) {
		result = result && value.getMonth() === comparisonObject.M;
	}
	if (Number.isInteger(comparisonObject.Y)) {
		result = result && value.getFullYear() === comparisonObject.Y;
	}
	return result;
};
export {getDateColumnEqualityComparisonResult};

const getEqualComparisonResult = (entityName, entity, condition) => {
	let result, values;
	values = Array.isArray(condition.value) ? condition.value : [condition.value];
	for (let value of values) {
		result = entityStructure[entityName].columns[condition.column].type === entityColumnTypes.DATE
			? getDateColumnEqualityComparisonResult(entity[condition.column], value)
			: entity[condition.column] === value;
		if (result) break;
	}
	return !!result;
};

const createFilterFunction = (entityName, filters) => {
	return entity => {
		if (!filters) {
			return true;
		}
		let result = true;
		for (let condition of filters) {
			switch (condition.comparisonType) {
				default:
					result = getEqualComparisonResult(entityName, entity, condition);
					break;
			}
			if (!result) {
				return false;
			}
		}
		return true;
	};
};
export {createFilterFunction};

const getValueByColumnType = (entityName, columnName, value) => {
	switch(entityStructure[entityName].columns[columnName].type) {
		case entityColumnTypes.NUMBER: return Number(value) || 0;
		case entityColumnTypes.DATE: return new Date(new Date(value).setHours(0, 0, 0, 0));
		case entityColumnTypes.LOOKUP: return value.value || "";
		case entityColumnTypes.BOOLEAN: return Boolean(value);
		default: return value;
	}
};
export {getValueByColumnType};

const getDefaultValueByColumnType = (entityName, columnName) => {
	switch(entityStructure[entityName].columns[columnName].type) {
		case entityColumnTypes.STRING: return "";
		case entityColumnTypes.NUMBER: return 0;
		case entityColumnTypes.DATE: return new Date(new Date().setHours(0, 0, 0, 0));
		case entityColumnTypes.LOOKUP: return "";
		case entityColumnTypes.BOOLEAN: return false;
		default: return;
	}
};
export {getDefaultValueByColumnType};

const setEntityDefaultValues = entityName => {
	let result = {};
	for (let column in entityStructure[entityName].columns) {
		if (!entityStructure[entityName].columns[column].isSystem) {
			result[column] = getDefaultValueByColumnType(entityName, column);
		}
	}
	return result;
};
export {setEntityDefaultValues};

const getTextValueByColumnType = (entityName, columnName, value, entity) => {
	if (entityStructure[entityName].columns[columnName].displayValueTransformFn) {
		return entityStructure[entityName].columns[columnName].displayValueTransformFn(value);
	}
	switch(entityStructure[entityName].columns[columnName].type) {
		case entityColumnTypes.NUMBER: return String(value);
		case entityColumnTypes.DATE: return getFormatedDate(value);
		case entityColumnTypes.LOOKUP: return entity ? entity.displayValues[columnName] : value;
		case entityColumnTypes.BOOLEAN: return value ? "+" : "-";
		default: return value;
	}
};
export {getTextValueByColumnType};

const getEditValueByColumnType = (entityName, columnName, value, entity) => {
	switch(entityStructure[entityName].columns[columnName].type) {
		case entityColumnTypes.DATE: return new Date(value);
		case entityColumnTypes.LOOKUP: return {value: entity[columnName], label: entity.displayValues[columnName]};
		default: return value;
	}
};
export {getEditValueByColumnType};

const findRelatedEntities = (entityName, id, db) => {
	const entityRelationsColumns = entityRelations.data
		.filter(e => e.linkTo === entityStructure[entityName].id)
		.map(e => e.column);
	const relatedColumns = entityColumns.data
		.filter(e => entityRelationsColumns.indexOf(e.id) !== -1)
		.map(c => {
			return {
				title: c.title,
				entity: c.entity
			};
		}),
		relatedEntities = {};
	for (let column of relatedColumns) {
		if (!relatedEntities.hasOwnProperty(column.entity)) {
			const entityName = entities.data.filter(e => e.id === column.entity).map(e => e.title)[0];
			if (!entityName) continue;
			relatedEntities[column.entity] = {
				entityName: entityName,
				columns: []
			};
		}
		relatedEntities[column.entity].columns.push(column.title);
	}
	let relatedEntitiesInDb = [],
		isFound = false;
	for (let entity in relatedEntities) {
		if (db.hasOwnProperty(relatedEntities[entity].entityName)) {
			for (let row of db[relatedEntities[entity].entityName]) {
				for (let column of relatedEntities[entity].columns) {
					if (row[column] === id) {
						relatedEntitiesInDb.push(relatedEntities[entity].entityName);
						isFound = true;
						break;
					}
				}
				if (isFound) {
					isFound = false;
					break;
				}
			}
		}
	}
	return [...relatedEntitiesInDb];
};
export {findRelatedEntities};

const getCantDeleteByIntegrityConstraintMessage = deleteResult => {
	return `Can't delete ${deleteResult.notDeleted.length} record(s).` +
		`Found related records in ${deleteResult.relatedEntities.join(",")}`;
};
export {getCantDeleteByIntegrityConstraintMessage};

const syncDb = (entityName, data, db) => {
	db[entityName] = data;
};
export {syncDb};

const getDbBranchFromServer = (entityName) => {
	let xhr = new XMLHttpRequest();
	xhr.open("GET", "http://localhost:3000/syncDb?entity=" + entityName);
	xhr.send();
	return new Promise((res, rej) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status !== 200) {
					rej(xhr.status + ': ' + xhr.statusText);
				} else {
					res(JSON.parse(xhr.responseText));
				}
			}
		};
	});
};
export {getDbBranchFromServer};

const postDbBranchToServer = (entity, data) => {
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/syncDb");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify({
		entity,
		data
	}));
	return new Promise((res, rej) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status !== 200) {
					rej(xhr.status + ": " + xhr.statusText);
				} else {
					res(JSON.parse(xhr.responseText));
				}
			}
		};
	});
};
export {postDbBranchToServer};

const prepareDataToCreateDisplayValues = (entityName, entity, resultObject = {}) => {
	for (let column in entity) {
		if (entity[column]) {
			if ((entityStructure[entityName].columns[column] || {}).type === entityColumnTypes.LOOKUP) {
				let linkToName = entityStructure[entityName].columns[column].linkTo.entityName;
				if (!resultObject[linkToName]) {
					resultObject[linkToName] = [];
				}
				if (resultObject[linkToName].indexOf(entity[column] === -1)) {
					resultObject[linkToName].push(entity[column]);
				}
			}
		}
	}
};
export {prepareDataToCreateDisplayValues};

const selectDisplayValues = (objects, db) => {
	let preparedData = {};
	for (let obj of objects) {
		let entityName = obj.name;
		for (let entity of obj.entities) {
			prepareDataToCreateDisplayValues(entityName, entity, preparedData);
		}
	}
	if (!Object.keys(preparedData).length) {
		return Promise.resolve();
	}
	const data = [];
	for (let entity in preparedData) {
		data.push({
				entityName: entity,
				filters: [
					{
						column: "id",
						value: preparedData[entity]
					}
				]
			});
	}
	let xhr = new XMLHttpRequest();
	xhr.open("POST", "http://localhost:3000/select");
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify({data}));
	return new Promise((res, rej) => {
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status !== 200) {
					rej(xhr.status + ": " + xhr.statusText);
				} else {
					let result = JSON.parse(xhr.responseText);
					for (let entityName in result.data) {
						for (let record of result.data[entityName]) {
							writeEntityToDb(entityName, record, db);
						}
					}
					res();
				}
			}
		};
	});
};
export {selectDisplayValues};

const writeEntityToDb = (entityName, entity, db) => {
	db[entityName] = [...db[entityName].filter(e => e.id !== entity.id), entity];
};
export {writeEntityToDb};

const coreValidator = {
	validateRequired(value) {
		return !!value;
	},
	validateStringLength(min, max, value) {
		min = min || Number.NEGATIVE_INFINITY;
		max = max || Number.POSITIVE_INFINITY;
		length = (value || "").length;
		return length >= min && length <= max;
	},
	validatePositiveNumber(value) {
		return Number(value) && value > 0;
	},
	validateNotNegativeNumber(value) {
		return Number(value) && value >= 0;
	},
	validateRequiredLookup(value = {}) {
		return value && value.value;
	},
	validateDateRange(min, max, value) {
		min = min || Number.NEGATIVE_INFINITY;
		max = max || Number.POSITIVE_INFINITY;
		const time = new Date(value).getTime();
		return time >= min && time <= max;
	}
};
export {coreValidator};
