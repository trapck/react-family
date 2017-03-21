export default {
	validate(entity, config) {
		const invalidColumns = [];
		for (let column in config) {
			for (let validateFn of config[column].validators) {
				if (!validateFn(entity[column])) {
					invalidColumns.push({
						name: column,
						message: config[column].message || ""
					});
					break;
				}
			}
		}
		return invalidColumns;
	}
};
