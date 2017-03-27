import React, {PropTypes} from "react";
import EntityRow from "../common/general-entity-row";

class Expense extends EntityRow {
	constructor(props) {
		super(props, "expense");
	}
}

export default Expense;
