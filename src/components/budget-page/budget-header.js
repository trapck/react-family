import React from "react";
import {Link, IndexLink} from "react-router";

const Header = () => {
	return (
		<div>
			<IndexLink to = "/budget" className = "link" activeClassName = "link_active">Current month</IndexLink>
			{" | "}
			<Link to = "/budget/charts" className = "link" activeClassName = "link_active">Charts</Link>
			{" | "}
			<Link to = "/budget/settings" className = "link" activeClassName = "link_active">Settings</Link>
			{" | "}
		</div>
	);
};

export default Header;
