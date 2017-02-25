import ColumnTypes from "./entity-column-types";

export default {
	entityName: "entityColumn",
	data: [
		// entity
		{
			id: "930b4abf-e75b-437c-9775-19bc66ba8065",
			title: "id",
			caption: "Id",
			entity: "b667cdb0-d94d-4ab5-9344-7857c7fe1fa9",
			type: ColumnTypes.GUID,
			isDisplayValue: false,
			isSystem: true
		},
		{
			id: "3a0944f1-44e7-4765-8b96-3bd6004d0f7f",
			title: "title",
			caption: "Title",
			entity: "b667cdb0-d94d-4ab5-9344-7857c7fe1fa9",
			type: ColumnTypes.STRING,
			isDisplayValue: true
		},

		// entityColumn
		{
			id: "64b133f6-61b5-4c5e-b803-653680ff9ef4",
			title: "id",
			caption: "Id",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnTypes.GUID,
			isDisplayValue: false,
			isSystem: true
		},
		{
			id: "7c521622-871f-409e-8221-b830ca74a099",
			title: "title",
			caption: "Title",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnTypes.STRING,
			isDisplayValue: true
		},
		{
			id: "187e3046-f364-42f0-b4f9-c05966b184e4",
			title: "caption",
			caption: "Caption",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnTypes.STRING,
			isDisplayValue: false
		},
		{
			id: "7a267ca2-eb88-402f-964b-7e0139242c99",
			title: "entity",
			caption: "Entity",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnTypes.LOOKUP,
			isDisplayValue: false
		},
		{
			id: "79585ebb-544d-43a3-b7af-173ff0e4a0fb",
			title: "type",
			caption: "Type",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnTypes.STRING,
			isDisplayValue: false
		},
		{
			id: "593af5ff-8571-4590-a88a-8a86ad33bfd7",
			title: "Is display value",
			caption: "Display column",
			entity: "2c78b83f-e46e-4421-8df5-45957578399b",
			type: ColumnTypes.BOOLEAN,
			isDisplayValue: false
		},

		// entityRelations
		{
			id: "50d14e7e-0550-4e5f-893c-164bd4f7b37c",
			title: "id",
			caption: "Id",
			entity: "1b443d40-8caf-4c7b-9d29-9524b17c70fa",
			type: ColumnTypes.GUID,
			isDisplayValue: true,
			isSystem: true
		},
		{
			id: "65be328d-1820-4b8c-a0d6-2fab925c91b0",
			title: "column",
			caption: "Column",
			entity: "1b443d40-8caf-4c7b-9d29-9524b17c70fa",
			type: ColumnTypes.LOOKUP,
			isDisplayValue: false
		},
		{
			id: "dd6d825a-b454-4219-a660-aa02f93c0dba",
			title: "linkTo",
			caption: "LinkTo",
			entity: "1b443d40-8caf-4c7b-9d29-9524b17c70fa",
			type: ColumnTypes.LOOKUP,
			isDisplayValue: false
		},
		{
			id: "505906c6-39f4-4edb-8c93-3f753329fe69",
			title: "isCheckIntegrityConstraint",
			caption: "Check IntegrityConstraint",
			entity: "1b443d40-8caf-4c7b-9d29-9524b17c70fa",
			type: ColumnTypes.BOOLEAN,
			isDisplayValue: false
		},
		{
			id: "71f1bbc2-b244-4ef6-a05e-4834bb8dfb86",
			title: "isDeleteCascade",
			caption: "Is cascade delete allowed",
			entity: "1b443d40-8caf-4c7b-9d29-9524b17c70fa",
			type: ColumnTypes.BOOLEAN,
			isDisplayValue: false
		},
		{
			id: "560bf1a9-630f-40f6-9054-4b24bf1a5b28",
			title: "isShowDeleteCascadeWarning",
			caption: "Show cascade delete warning",
			entity: "1b443d40-8caf-4c7b-9d29-9524b17c70fa",
			type: ColumnTypes.BOOLEAN,
			isDisplayValue: false
		},

		// user
		{
			id: "ee89be03-de03-41ab-83e1-89ab1265f8fd",
			title: "id",
			caption: "Id",
			entity: "20d0b3ce-d429-4c29-ad37-621151c4e435",
			type: ColumnTypes.GUID,
			isDisplayValue: false,
			isSystem: true
		},
		{
			id: "b08d9582-3768-4ac6-9bb2-ef2f3b769503",
			title: "name",
			caption: "Name",
			entity: "20d0b3ce-d429-4c29-ad37-621151c4e435",
			type: ColumnTypes.STRING,
			isDisplayValue: false
		},
		{
			id: "eea3d19c-31d5-4380-9547-65b06975874e",
			title: "nickName",
			caption: "NickName",
			entity: "20d0b3ce-d429-4c29-ad37-621151c4e435",
			type: ColumnTypes.STRING,
			isDisplayValue: true
		},

		// expenseCategory
		{
			id: "0d7afb5d-ed52-46c2-ab71-fd8f00200c1f",
			title: "id",
			caption: "Id",
			entity: "66be585d-c017-4316-8f0d-56724f17f765",
			type: ColumnTypes.GUID,
			isDisplayValue: false,
			isSystem: true
		},
		{
			id: "5b72051c-52b4-49b4-9191-83e53df81b5e",
			title: "title",
			caption: "Title",
			entity: "66be585d-c017-4316-8f0d-56724f17f765",
			type: ColumnTypes.STRING,
			isDisplayValue: true
		},
		{
			id: "67439829-9a81-4b24-abb3-05719b3b4018",
			title: "isNotVisibleInList",
			caption: "Isn't visible in list",
			entity: "66be585d-c017-4316-8f0d-56724f17f765",
			type: ColumnTypes.BOOLEAN,
			isDisplayValue: false
		},

		// monthExpenseLimit
		{
			id: "a5779e11-ce6d-4c0e-84de-6c4991c1a2ae",
			title: "id",
			caption: "Id",
			entity: "32d342b7-c909-4bf5-b82b-c6cf9f80f013",
			type: ColumnTypes.GUID,
			isDisplayValue: false,
			isSystem: true
		},
		{
			id: "61f6a61b-9b25-4975-9fe3-d8cd9f7d39ef",
			title: "income",
			caption: "Income",
			entity: "32d342b7-c909-4bf5-b82b-c6cf9f80f013",
			type: ColumnTypes.NUMBER,
			isDisplayValue: true
		},
		{
			id: "c339061f-9140-48b2-8ed6-43dda0e38d89",
			title: "limit",
			caption: "Limit",
			entity: "32d342b7-c909-4bf5-b82b-c6cf9f80f013",
			type: ColumnTypes.NUMBER,
			isDisplayValue: false
		},
		{
			id: "a8280def-53f0-44fd-9e4c-6f65a2b16074",
			title: "month",
			caption: "Month",
			entity: "32d342b7-c909-4bf5-b82b-c6cf9f80f013",
			type: ColumnTypes.NUMBER,
			isDisplayValue: false
		},
		{
			id: "a8280def-53f0-44fd-9e4c-6f65a2b16074",
			title: "year",
			caption: "Year",
			entity: "32d342b7-c909-4bf5-b82b-c6cf9f80f013",
			type: ColumnTypes.NUMBER,
			isDisplayValue: false
		},

		// expenseComment
		{
			id: "632f584e-8833-4946-a557-668c2816c818",
			title: "id",
			caption: "Id",
			entity: "f71ac263-d79a-48f6-9be0-ff5ff0ef4e2c",
			type: ColumnTypes.GUID,
			isDisplayValue: false,
			isSystem: true
		},
		{
			id: "60a65852-b9e8-40bd-93fe-763c9bd2221f",
			title: "text",
			caption: "Text",
			entity: "f71ac263-d79a-48f6-9be0-ff5ff0ef4e2c",
			type: ColumnTypes.STRING,
			isDisplayValue: true
		},
		{
			id: "fdd72aed-71eb-4f80-852c-647f4d51d03f",
			title: "expense",
			caption: "Expense",
			entity: "f71ac263-d79a-48f6-9be0-ff5ff0ef4e2c",
			type: ColumnTypes.LOOKUP,
			isDisplayValue: false
		},
		{
			id: "cec8208c-b4f8-4bf2-b0b5-c17ec69e783e",
			title: "author",
			caption: "Author",
			entity: "f71ac263-d79a-48f6-9be0-ff5ff0ef4e2c",
			type: ColumnTypes.LOOKUP,
			isDisplayValue: false
		},
		{
			id: "0362bf5a-12b3-4409-b455-01a952bfe015",
			title: "date",
			caption: "Date",
			entity: "f71ac263-d79a-48f6-9be0-ff5ff0ef4e2c",
			type: ColumnTypes.DATE,
			isDisplayValue: false
		},

		// month
		{
			id: "631be696-12ba-4088-b00d-3d7151f811a7",
			title: "id",
			caption: "Id",
			entity: "fd2ff769-1af4-4de7-ac39-d3ba8eb8b997",
			type: ColumnTypes.GUID,
			isDisplayValue: false,
			isSystem: true
		},
		{
			id: "916770b7-a8be-4cee-822c-9b0e6ad37e2a",
			title: "title",
			caption: "Title",
			entity: "fd2ff769-1af4-4de7-ac39-d3ba8eb8b997",
			type: ColumnTypes.STRING,
			isDisplayValue: true
		},
		{
			id: "2904a249-ee35-4c50-8323-3079e515df4e",
			title: "number",
			caption: "Number",
			entity: "fd2ff769-1af4-4de7-ac39-d3ba8eb8b997",
			type: ColumnTypes.NUMBER,
			isDisplayValue: false
		},

		// expense
		{
			id: "b119dde0-b685-4f0a-9913-07027c73fa65",
			title: "id",
			caption: "Id",
			entity: "61f64abc-1c5f-49bd-bab2-e90bde96e938",
			type: ColumnTypes.GUID,
			isDisplayValue: false,
			isSystem: true
		},
		{
			id: "13acd320-dd63-4b3f-970c-cbd98bb26400",
			title: "title",
			caption: "Title",
			entity: "61f64abc-1c5f-49bd-bab2-e90bde96e938",
			type: ColumnTypes.STRING,
			isDisplayValue: true
		},
		{
			id: "582ca9ce-af2a-41f2-a287-bdf404d635d1",
			title: "category",
			caption: "Category",
			entity: "61f64abc-1c5f-49bd-bab2-e90bde96e938",
			type: ColumnTypes.LOOKUP,
			isDisplayValue: false
		},
		{
			id: "7618f8d7-8160-465e-be13-55c40e167512",
			title: "amount",
			caption: "Amount",
			entity: "61f64abc-1c5f-49bd-bab2-e90bde96e938",
			type: ColumnTypes.NUMBER,
			isDisplayValue: false
		},
		{
			id: "948fa171-1312-42b5-968b-d9a1295f5544",
			title: "date",
			caption: "Date",
			entity: "61f64abc-1c5f-49bd-bab2-e90bde96e938",
			type: ColumnTypes.DATE,
			isDisplayValue: false
		},
		{
			id: "65059a77-18a5-4fe7-a06d-cc9efb48a294",
			title: "author",
			caption: "Author",
			entity: "61f64abc-1c5f-49bd-bab2-e90bde96e938",
			type: ColumnTypes.LOOKUP,
			isDisplayValue: false
		},
		{
			id: "7cf15039-a41d-4966-9596-03216fd0ab7c",
			title: "description",
			caption: "Description",
			entity: "61f64abc-1c5f-49bd-bab2-e90bde96e938",
			type: ColumnTypes.STRING,
			isDisplayValue: false,
			isMultiLine: true
		}
	]
};
