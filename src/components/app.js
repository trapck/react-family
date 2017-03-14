import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../redux/actions/action-creators";
import Header from "./header/header";
import entityStructure from "../static-data/entity-info/entity-sctructure";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getCurrentUser();
	}

	render() {
		return (
			<div>
				<Header {...this.props}/>
				<div className = "children-body">
					{this.props.children}
				</div>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	getCurrentUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
