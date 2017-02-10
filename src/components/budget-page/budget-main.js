import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";

class BudgetMain extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getExpenses(); // TODO: check to make call each time when selecting BudgetMain
	}

	render() {
		return (
			<div>
				<div>Current month</div>
				<ul>
					{this.props.expenses.map(item => {
						return (
							<li key={item.id}>{item.id + " " + item.title}</li>
						);
					})}
				</ul>
			</div>
		);
	}
}

BudgetMain.propTypes = {
	expenses: PropTypes.array.isRequired,
	getExpenses: PropTypes.func.isRequired
};

const mapStateToProps = state => {
	return {
		expenses: state.budget.expenses
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BudgetMain);
