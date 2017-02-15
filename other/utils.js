import entityColumns from "../src/static-data/entity-info/entity-columns";
import entities from "../src/static-data/entity-info/entities";
import entityRelations from "../src/static-data/entity-info/entity-relations";

const getFormatedDate = (date) => {
	let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate(),
	month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1),
	year = date.getFullYear();
	return `${day}.${month}.${year}`;
};
export {getFormatedDate};

const getEntityColumns = entityName => {
	const id = entities.data.filter(e => e.title === entityName)[0].id,
		columns = entityColumns.data.filter(e => e.entity === id);
	return columns;
};
export {getEntityColumns};

const getEntityColumnsCaptions = entityName => getEntityColumns(entityName).map(e => e.caption);
export {getEntityColumnsCaptions};

const getLookupDisplayValue = (value, entityName, columnName, dbData) => {
	const entityId = entities.filter(e => e.title === entityName)[0].id;
	const entityColumnId = entityColumns.filter(c => c.title === columnName && c.entity === entityId)[0].id;
	const linkToId = entityRelations.filter(r => r.column === entityColumnId)[0].linkTo;
	const linkToName = entities.filter(e => e.id === linkToId)[0].title;
	const displayValueColumnName = entityColumns.filter(c => c.entity === linkToId && c.isDisplayValue === true)[0].title;
	return (dbData[linkToName].filter(v => v.id === value)[0] || {})[displayValueColumnName];
};
export {getLookupDisplayValue};
