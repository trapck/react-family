import ColumnType from "./entity-column-type";

export default {
	entityName: "entityColumn",
	data: [
		//entity
		{
			id: "1caed83d-627d-4179-be5c-b17485e68e18",
			title: "id",
			caption: "Id",
			entity: "b667cdb0-d94d-4ab5-9344-7857c7fe1fa9",
			type: ColumnType.GUID,
			isDisplayValue: false
		},
		{
			id: "3a0944f1-44e7-4765-8b96-3bd6004d0f7f",
			title: "title",
			caption: "Title",
			entity: "b667cdb0-d94d-4ab5-9344-7857c7fe1fa9",
			type: ColumnType.STRING,
			isDisplayValue: true
		},

		//entityColumn
		{
			id: "64b133f6-61b5-4c5e-b803-653680ff9ef4",
			title: "id",
			caption: "Id",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnType.GUID,
			isDisplayValue: false
		},
		{
			id: "7c521622-871f-409e-8221-b830ca74a099",
			title: "title",
			caption: "Title",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnType.STRING,
			isDisplayValue: true
		},
		{
			id: "187e3046-f364-42f0-b4f9-c05966b184e4",
			title: "caption",
			caption: "Caption",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnType.STRING,
			isDisplayValue: false
		},
		{
			id: "7a267ca2-eb88-402f-964b-7e0139242c99",
			title: "entity",
			caption: "Entity",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnType.GUID,
			isDisplayValue: false
		},
		{
			id: "79585ebb-544d-43a3-b7af-173ff0e4a0fb",
			title: "type",
			caption: "Type",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnType.STRING,
			isDisplayValue: false
		},
		{
			id: "593af5ff-8571-4590-a88a-8a86ad33bfd7",
			title: "Is display value",
			caption: "Display column",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnType.BOOLEAN,
			isDisplayValue: false
		}
	]
}
