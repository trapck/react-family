import {coreValidator} from "../../../other/utils";
import constants from "../../../other/general-const";
import generalValidator from "./general-validator";

const incomeLimitValidator = (value, columnName, entity) => {
	let income, limit;
	if (columnName === "income") {
		income = value;
		limit = entity.limit;
	} else {
		limit = value;
		income = entity.income;
	}
	return income >= limit;
	},
	incomeLimitValidationMessage = "Limit < Income";

const config = {
	income: {
		validators: [
			coreValidator.validateNotNegativeNumber,
			incomeLimitValidator
		],
		message: incomeLimitValidationMessage
	},
	limit: {
		validators: [
			coreValidator.validateNotNegativeNumber,
			incomeLimitValidator
		],
		message: incomeLimitValidationMessage
	}
};

const validate = entity => {
	return generalValidator.validate(entity, config);
};

const validateColumn = (columnName, value, entity) => {
	return generalValidator.validateColumn(columnName, value, config, entity);
};

export default {
	config,
	validate,
	validateColumn
};
