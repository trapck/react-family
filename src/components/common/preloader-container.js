import React, {PropTypes} from "react";
import Preloader from "./preloader";

const container = (props) => {
	return props.isLoading.hasOwnProperty(props.isLoadingToken) &&
		props.isLoading[props.isLoadingToken] ?
		<Preloader/> :
		props.children;
};

container.propTypes = {
	children: PropTypes.object.isRequired,
	isLoading: PropTypes.object.isRequired,
	isLoadingToken: PropTypes.string.isRequired
};

export default container;
