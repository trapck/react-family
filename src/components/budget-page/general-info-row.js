import React, {PropTypes} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as actionCreators from "../../redux/actions/action-creators";

class GeneralInfoRow extends React.Component {
	constructor(props) {
		super(props);
	}

	preventFn(e) {
		e.preventDefault();
	}

	onHeaderClick(isCollapsed) {
		this.props.setGeneralInfoGroupCollapsed(isCollapsed);
	}

	render() {
		return (
			<div>
				<a href = "#" className = "link" onClick = {this.preventFn}>{`${this.props.title} (${this.props.count}) ${this.props.amount}`}</a>
			</div>
		);
	}
}

GeneralInfoRow.propTypes = {
	category: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	count: PropTypes.number.isRequired,
	amount: PropTypes.number.isRequired,
	setGeneralInfoGroupCollapsed: PropTypes.func.isRequired,
	isCollapsed: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
	debugger;
	let isCollapsed = state.budget.ui.isGeneralInfoRowCollapsed.hasOwnProperty(ownProps.category) ?
		state.budget.ui.isGeneralInfoRowCollapsed[ownProps.category] :
		true;
	return {
		isCollapsed
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfoRow);

