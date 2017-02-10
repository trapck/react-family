import React from "react";
import {Link, IndexLink} from "react-router";

const HeaderNav = () => {
	return (
		<div className = "header-nav">
			<IndexLink to="/" className = "link" activeClassName = "link_active">
				Home
			</IndexLink>
			{" | "}
			<Link to="/budget" className = "link" activeClassName = "link_active">
				Budget
			</Link>
			{" | "}
			<Link to="/next" className = "link" activeClassName = "link_active">
				Next
			</Link>
		</div>
	);
};

export default HeaderNav;
