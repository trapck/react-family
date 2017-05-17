import React, {PropTypes} from "react";
import Button from "../common/button";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import guid from "uuid/v4";

class ExpenseCommentsPage extends React.Component {
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		this.props.getExpenseComments(undefined, this.isLoadingToken);
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	render() {
		return (
			<div>
				<Button caption="Close" onClick={this.props.onClose} />
				{this.props.comments.map((c, i) => <div key={i}>{c.text}</div>)}
			</div>
		);
	}
}

ExpenseCommentsPage.propTypes = {
	onClose: PropTypes.func.isRequired,
	comments: PropTypes.array.isRequired,
	getExpenseComments: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		comments: state.budget.expenseComments
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseCommentsPage);
