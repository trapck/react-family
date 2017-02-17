export default {
	entityName: "entityRelations",
	data: [
		// entityColumn.entity -> entity.id
		{
			id: "",
			column: "7a267ca2-eb88-402f-964b-7e0139242c99",
			linkTo: "b667cdb0-d94d-4ab5-9344-7857c7fe1fa9",
			isCheckIntegrityConstraint: false,
			isDeleteCascade: false,
			isShowDeleteCascadeWarning: false
		},
		// entityRelations.column -> entityColumn.id
		{
			id: "",
			column: "65be328d-1820-4b8c-a0d6-2fab925c91b0",
			linkTo: "2c78b83f-e46e-4421-8df5-45957578399b",
			isCheckIntegrityConstraint: false,
			isDeleteCascade: false,
			isShowDeleteCascadeWarning: false
		},
		// entityRelations.linkTo -> entityColumn.id
		{
			id: "",
			column: "dd6d825a-b454-4219-a660-aa02f93c0dba",
			linkTo: "2c78b83f-e46e-4421-8df5-45957578399b",
			isCheckIntegrityConstraint: false,
			isDeleteCascade: false,
			isShowDeleteCascadeWarning: false
		},
		// expenseComment.expense -> expense.id
		{
			id: "",
			column: "fdd72aed-71eb-4f80-852c-647f4d51d03f",
			linkTo: "61f64abc-1c5f-49bd-bab2-e90bde96e938",
			isCheckIntegrityConstraint: false,
			isDeleteCascade: false,
			isShowDeleteCascadeWarning: false
		},
		// expenseComment.author -> user.id
		{
			id: "",
			column: "cec8208c-b4f8-4bf2-b0b5-c17ec69e783e",
			linkTo: "20d0b3ce-d429-4c29-ad37-621151c4e435",
			isCheckIntegrityConstraint: false,
			isDeleteCascade: false,
			isShowDeleteCascadeWarning: false
		},
		// expense.category -> expenseCategory.id
		{
			id: "",
			column: "582ca9ce-af2a-41f2-a287-bdf404d635d1",
			linkTo: "66be585d-c017-4316-8f0d-56724f17f765",
			isCheckIntegrityConstraint: false,
			isDeleteCascade: false,
			isShowDeleteCascadeWarning: false
		},
		// expense.author -> user.id
		{
			id: "",
			column: "65059a77-18a5-4fe7-a06d-cc9efb48a294",
			linkTo: "20d0b3ce-d429-4c29-ad37-621151c4e435",
			isCheckIntegrityConstraint: false,
			isDeleteCascade: false,
			isShowDeleteCascadeWarning: false
		}
	]
};
