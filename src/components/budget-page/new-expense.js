import React, {PropTypes} from "react";
import LabelCover from "../common/label-cover";

const NewExpense = props => {
	return (
		<form>
			<LabelCover caption = "Title">
				<input/>
			</LabelCover>
			<LabelCover caption = "Amount">
				<input/>
			</LabelCover>
		</form>
	);
};

export default NewExpense;
