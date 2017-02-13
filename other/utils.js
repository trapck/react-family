import entityColumns from "../src/static-data/entity-info/entity-columns";
import entities from "../src/static-data/entity-info/entities";

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
