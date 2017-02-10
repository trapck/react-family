import React, {PropTypes} from "react";
import {Link, IndexLink} from "react-router";

const HeaderCurrentUser = (props) => {
	const onClick = e => e.preventDefault();
	return (
		<div className = "header-current-user">
			<a href = "#" className = "link" onClick = {onClick}>{props.currentUser.nickName}</a>
		</div>
	);
};

HeaderCurrentUser.propTypes = {
	currentUser: PropTypes.object.isRequired
};

export default HeaderCurrentUser;
