import React, {PropTypes} from "react";
import DeleteIcon from "../common/delete-icon";
import entityListHelper from "../../helpers/visual-helpers/entity-list-helper";
import ExpenseComment from "./expense-comment";
import toastr from "toastr";

class ExpenseCommentsList extends React.Component {
	constructor(props) {
		super(props);
		this.onCommentValueUpdated = this.onCommentValueUpdated.bind(this);
		this.onDeleteCommentClick = this.onDeleteCommentClick.bind(this);
	}

	onCommentValueUpdated(id, columnName, columnValue) {
		this.props.updateExpenseComment([
			{
				id,
				values: [
					{
						columnName,
						columnValue
					}
				]
			}
		], this.props.isLoadingToken).then(() => {
			toastr.success("Comment updated");
		});
	}

	onDeleteCommentClick(args) {
		this.props.deleteExpenseComment([{
			column: "id",
			value: args.id
		}], this.props.isLoadingToken).then(() => {
				toastr.success("Expense comment deleted");
			},
			() => toastr.error("Something went wrong"));
	}

	render() {
		const additionalRightCells = [this.props.comments.map(
			c => <DeleteIcon key = {c.id} onClick = {this.onDeleteCommentClick} onClickArguments = {{id: c.id}}/>
		)];
		return (
			<div>
				{
					entityListHelper.createTableList(
						ExpenseComment,
						this.props.comments,
						"expenseComment",
						this.onCommentValueUpdated,
						additionalRightCells,
						[],
						["id", "expense"],
						"expense-comments-table"
					)
				}
			</div>
		);
	}
}

ExpenseCommentsList.propTypes = {
	comments: PropTypes.array.isRequired,
	updateExpenseComment: PropTypes.func.isRequired,
	deleteExpenseComment: PropTypes.func.isRequired,
	isLoadingToken: PropTypes.string
};

export default ExpenseCommentsList;
