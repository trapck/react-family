import React, {PropTypes} from "react";
import {Link, IndexLink} from "react-router";
import HeaderNav from "./header-nav";
import HeaderLogin from "./header-login";


const Header = (props) => {
	return (
		<div className = "header">
			<HeaderNav/>
			<HeaderLogin {...props}/>
		</div>
	);
};

Header.propTypes = {
	currentUser: PropTypes.object.isRequired
};

export default Header;
