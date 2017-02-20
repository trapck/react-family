import entityColumns from "../src/static-data/entity-info/entity-columns";
import entityColumnTypes from "../src/static-data/entity-info/entity-column-types";
import entities from "../src/static-data/entity-info/entities";
import entityStructure from "../src/static-data/entity-info/entity-sctructure";
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
		result = value.getMonth() === comparisonObject.M;
	}
	if (comparisonObject.Y) {
		result = value.getFullYear() === comparisonObject.Y;
	}
	return result;
};

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
