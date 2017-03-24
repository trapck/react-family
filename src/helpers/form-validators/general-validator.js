export default {
	validate(entity, config) {
		const invalidColumns = [];
		for (let column in config) {
			for (let validateFn of config[column].validators) {
				if (!validateFn(entity[column], entity)) {
					invalidColumns.push({
						name: column,
						message: config[column].message || ""
					});
					break;
				}
			}
		}
		return invalidColumns;
	},
	validateColumn(columnName, value, config, entity){
		let result = {
			success: true,
			message: ""
		};
		if (config.hasOwnProperty(columnName)) {
			for (let validateFn of config[columnName].validators) {
				if (!validateFn(value, columnName, entity)) {
					result.success = false;
					result.message = config[columnName].message || "";
					break;
				}
			}
		}
		return result;
	}
};
