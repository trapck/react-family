import {coreValidator} from "../../../other/utils";
import generalValidator from "./general-validator";

const config = {
	title: {
		validators: [coreValidator.validateRequired],
		message: ""
	},
	category: {
		validators: [coreValidator.validateRequiredLookup],
		message: ""
	},
	amount: {
		validators: [coreValidator.validatePositiveNumber],
		message: ""
	},
	date: {
		validators: [
			coreValidator.validateRequired,
			coreValidator.validateDateRange.bind(null, undefined, new Date(new Date().setHours(0, 0, 0, 0)))
		],
		message: ""
	},
	author: {
		validators: [coreValidator.validateRequiredLookup],
		message: ""
	}
};

const validate = entity => {
	return generalValidator.validate(entity, config);
};

export default {
	config,
	validate
};
