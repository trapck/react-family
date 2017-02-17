import entities from "./entities";
import entityColumns from "./entity-columns";
import entityRelations from "./entity-relations";
import columnTypes from "./entity-column-types";

let structure = {};
for (let entity of entities.data) {
	let filteredEntityColumns = entityColumns.data.filter(c => c.entity === entity.id),
		columnsObject = {};
	for(let column of filteredEntityColumns) {
		columnsObject[column.title] = Object.assign({}, column);
		if (column.type === columnTypes.LOOKUP) {
			let linkToId = entityRelations.data.filter(r => r.column === column.id)[0].linkTo,
				linkToEntity = entities.data.filter(e => e.id === linkToId)[0],
				linkToColumn = entityColumns.data.filter(c => c.entity === linkToId && c.isDisplayValue)[0];
			columnsObject[column.title].linkTo = {
				entityName: linkToEntity.title,
				columnName: linkToColumn.title
			};
		}
	}
	structure[entity.title] = Object.assign({}, entity, {
		displayColumnName: filteredEntityColumns.filter(c => c.isDisplayValue)[0].title,
		columns: columnsObject
	});
}
export default structure;
