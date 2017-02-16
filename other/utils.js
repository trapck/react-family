import entityColumns from "../src/static-data/entity-info/entity-columns";
import entityColumnTypes from "../src/static-data/entity-info/entity-column-types";
import entities from "../src/static-data/entity-info/entities";
import entityStructure from "../src/static-data/entity-info/entity-sctructure";

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
