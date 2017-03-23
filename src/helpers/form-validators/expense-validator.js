import {coreValidator} from "../../../other/utils";
import constants from "../../../other/general-const";
import generalValidator from "./general-validator";

const config = {
	title: {
		validators: [coreValidator.validateRequired],
		message: constants.VALIDATION_DEFAULT_MESSAGE
	},
	category: {
		validators: [coreValidator.validateRequiredLookup],
		message: constants.VALIDATION_DEFAULT_MESSAGE
	},
	amount: {
		validators: [coreValidator.validatePositiveNumber],
		message: constants.VALIDATION_DEFAULT_MESSAGE
	},
	date: {
		validators: [
			coreValidator.validateRequired,
			coreValidator.validateDateRange.bind(null, undefined, new Date(new Date().setHours(0, 0, 0, 0)))
		],
		message: constants.VALIDATION_DEFAULT_MESSAGE
	},
	author: {
		validators: [coreValidator.validateRequiredLookup],
		message: constants.VALIDATION_DEFAULT_MESSAGE
	}
};

const validate = entity => {
	return generalValidator.validate(entity, config);
};

const validateColumn = (columnName, value) => {
	return generalValidator.validateColumn(columnName, value, config);
};

export default {
	config,
	validate,
	validateColumn
};
