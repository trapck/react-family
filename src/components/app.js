import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as actionCreators from "../redux/actions/action-creators";
import Header from "./header/header";

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getUsers();
	}

	render() {
		return (
			<div>
				<Header/>
				<div>{this.props.currentUser.name + " : " + this.props.currentUser.nickName}</div>
				<div>
					{this.props.users.map(
						(user) => {
							return (<p key = {user.id}>{user.nickName}</p>);
						}
					)}
				</div>
				<div>
					{this.props.children}
				</div>
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.object.isRequired,
	currentUser: PropTypes.object.isRequired,
	setCurrentUser: PropTypes.func.isRequired,
	users: PropTypes.array.isRequired,
	getUsers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
	return {
		currentUser: state.currentUser,
		users: state.users
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
