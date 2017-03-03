import React, {PropTypes} from "react";
import Preloader from "./preloader";

const PrealoaderContainer = props => {
	const isLoading = props.isLoading.hasOwnProperty(props.isLoadingToken) && props.isLoading[props.isLoadingToken];
	return (
		<div>
			<div style = {{display: isLoading ? "block" : "none"}}>
				<Preloader message = {props.message}/>
			</div>
			<div style = {{display: isLoading ? "none" : "block"}}>
				{props.children}
			</div>
		</div>
	);
};

PrealoaderContainer.propTypes = {
	children: PropTypes.object,
	isLoading: PropTypes.object.isRequired,
	isLoadingToken: PropTypes.string.isRequired,
	message: PropTypes.string
};

export default PrealoaderContainer;
