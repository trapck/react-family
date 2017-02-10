import React, {PropTypes} from "react";
import {Link, IndexLink} from "react-router";
import HeaderCurrentUser from "./header-current-user";

const HeaderLogin = (props) => {
	return (
		<div className = "header-login">
			<HeaderCurrentUser {...props} />
		</div>
	);
};

HeaderLogin.propTypes = {
	currentUser: PropTypes.object.isRequired
};

export default HeaderLogin;
