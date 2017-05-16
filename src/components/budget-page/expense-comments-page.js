import React, {PropTypes} from "react";
import Button from "../common/button";

class ExpenseCommentsPage extends React.Component {
	render() {
		return (
			<div>
				<Button caption="Close" onClick={this.props.onClose} />
				<div>Content</div>
			</div>
		);
	}
}

ExpenseCommentsPage.propTypes = {
	onClose: PropTypes.func.isRequired
};

export default ExpenseCommentsPage;
