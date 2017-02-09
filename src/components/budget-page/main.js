import React from "react";
import MockApi from "../../../other/mock-api";

const Main = () => {
	return (
		<div>
			<div>Current month</div>
				<ul>
					{MockApi.getExpenses().map(item => {
						return (
							<li key = {item.id}>{item.id + " " + item.title}</li>
						);
					})}
				</ul>
		</div>
	);
};

export default Main;
