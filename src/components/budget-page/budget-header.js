import React from "react";
import {Link, IndexLink} from "react-router";

const Header = () => {
	return (
		<div>
			<IndexLink to = "/budget" className = "link" activeClassName = "link_active">Current month</IndexLink>
			{" | "}
			<IndexLink to = "budget/history" className = "link" activeClassName = "link_active">History</IndexLink>
			{" | "}
			<IndexLink to = "budget/settings" className = "link" activeClassName = "link_active">Settings</IndexLink>
			{" | "}
		</div>
	);
};

export default Header;
