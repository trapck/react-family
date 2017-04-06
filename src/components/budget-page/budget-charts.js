import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import CurrentMonthCategoriesChart from "./current-month-categories-chart";

class Charts extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const currentMonth = this.props.currentMonth.number,
			currentYear = this.props.currentYear;
		this.props.getCurrentMonthGeneralInfo(undefined, this.isLoadingToken, currentMonth, currentYear);
	}

	render() {
		return (
			<div>
				<CurrentMonthCategoriesChart generalInfo={this.props.generalInfo}/>
			</div>
		);
	}
}

Charts.propTypes = {
	generalInfo: PropTypes.array.isRequired,
	getCurrentMonthGeneralInfo: PropTypes.func.isRequired,
	currentMonth: PropTypes.object.isRequired,
	currentYear: PropTypes.number.isRequired
};

const mapStateToProps = state => {
	return {
		generalInfo: state.budget.currentMonthGeneralInfo,
		currentMonth: state.budget.ui.currentMonth,
		currentYear: state.budget.ui.currentYear
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Charts);
