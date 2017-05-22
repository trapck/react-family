import {coreValidator} from "../../../other/utils";
import constants from "../../../other/general-const";
import generalValidator from "./general-validator";

const config = {
	text: {
		validators: [coreValidator.validateRequired],
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
