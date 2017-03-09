import entityColumns from "../src/static-data/entity-info/entity-columns";
import entityColumnTypes from "../src/static-data/entity-info/entity-column-types";
import entities from "../src/static-data/entity-info/entities";
import entityStructure from "../src/static-data/entity-info/entity-sctructure";
import entityRelations from "../src/static-data/entity-info/entity-relations";
import entityColumns from "../src/static-data/entity-info/entity-columns";
import comparisonTypes from "../src/static-data/comparison-types";

const getFormatedDate = (date) => {
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
	let result = true;
	if (comparisonObject.D) {
		result = value.getDate() === comparisonObject.D;
	}
	if (comparisonObject.M) {
		result = result && value.getMonth() === comparisonObject.M;
	}
	if (comparisonObject.Y) {
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
		case entityColumnTypes.LOOKUP: return {value: entity[columnName], label: entity.displayValues[columnName]};
		default: return value;
	}
};
export {getEditValueByColumnType};

const findRelatedEntities = (entityName, id, db) => {
	const relatedColumns = entityColumns.data
			.filter(
				e => entityRelations.data
				.filter(e => e.linkTo === entityStructure[entityName].id)
				.map(e => e.column).indexOf(e) !== -1
		).map(c => {
				return {
					title: c.title,
					entity: c.entity
				};
			}),
		relatedEntities = {};
	for (let column of relatedColumns) {
		if (!relatedEntities.hasOwnProperty(column.entity)) {
			const entityName = enties.data.filter(e => e.id === column.entity)[0];
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


