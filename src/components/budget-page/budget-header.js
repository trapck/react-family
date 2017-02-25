import React from "react";
import {Link, IndexLink} from "react-router";

const Header = () => {
	return (
		<div>
			<IndexLink to = "/budget" className = "link" activeClassName = "link_active">Current month</IndexLink>
			{" | "}
			<Link to = "/budget/history" className = "link" activeClassName = "link_active">History</Link>
			{" | "}
			<Link to = "/budget/settings" className = "link" activeClassName = "link_active">Settings</Link>
			{" | "}
		</div>
	);
};

export default Header;
