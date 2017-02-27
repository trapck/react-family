import React, {PropTypes} from "react";
import Preloader from "./preloader";

const container = props => {
	const isLoading = props.isLoading.hasOwnProperty(props.isLoadingToken) && props.isLoading[props.isLoadingToken];
	return (
		<div>
			<div style = {{display: isLoading ? "block" : "none"}}>
				<Preloader/>
			</div>
			<div style = {{display: isLoading ? "none" : "block"}}>
				{props.children}
			</div>
		</div>
	);
};

container.propTypes = {
	children: PropTypes.object.isRequired,
	isLoading: PropTypes.object.isRequired,
	isLoadingToken: PropTypes.string.isRequired
};

export default container;
