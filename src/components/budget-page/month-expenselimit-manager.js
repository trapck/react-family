import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";
import PreloaderContainer from "../common/preloader-container";
import guid from "uuid/v4";

class MonthExpenseLimitManager extends React.Component{
	constructor(props) {
		super(props);
		this.isLoadingToken = guid();
	}

	componentWillMount() {
		this.props.getMonthExpenseLimits([
			{
				column: "month",
				value: new Date().getMonth()
			}, {
				column: "year",
				value: new Date().getFullYear()
			}
		], this.isLoadingToken);
	}

	componentWillUnmount() {
		this.props.removeIsLoading(this.isLoadingToken);
	}

	render() {
		return (
			<PreloaderContainer isLoading = {this.props.isLoading} isLoadingToken = {this.isLoadingToken}>
				<div>
					{
						`Income=${this.props.monthLimit.income || ""};` +
						`Limit=${this.props.monthLimit.limit || ""};` +
						`Month=${this.props.monthLimit.month || ""};` +
						`Year=${this.props.monthLimit.year || ""}`
					}
				</div>
			</PreloaderContainer>
		);
	}
}

MonthExpenseLimitManager.propTypes = {
	monthLimit: PropTypes.object.isRequired,
	getMonthExpenseLimits: PropTypes.func.isRequired,
	removeIsLoading: PropTypes.func.isRequired,
	isLoading: PropTypes.object.isRequired
};

const mapStateToProps = state => {
	return {
		isLoading: state.isLoading,
		monthLimit: state.budget.monthLimits
			.filter(l => l.month === new Date().getMonth() && l.year === new Date().getFullYear())[0] || {}
	};
};

const mapDispatchToProps = dispatch => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MonthExpenseLimitManager);
