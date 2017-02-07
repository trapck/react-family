import React, {PropTypes} from "react";
import Header from "./header/header";

const App = (props) => {
	return (
		<div>
			<Header/>
			<div>
				{props.children}
			</div>
		</div>
	);
};

App.propTypes = {
	children: PropTypes.object.isRequired
};

export default App;
