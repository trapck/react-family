import expenseValidator from "./expense-validator";
import expenseCategoryValidator from "./expense-category-validator";
import expenseLimitValidator from "./expense-limit-validator";
import expenseCommentValidator from "./expense-comment-validator";

export default {
	getValidator(entityName) {
		switch (entityName) {
			case "expense": return expenseValidator;
			case "expenseCategory": return expenseCategoryValidator;
			case "monthExpenseLimit": return expenseLimitValidator;
			case "expenseComment": return expenseCommentValidator;
		}
	}
};
