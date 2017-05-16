import React, {PropTypes} from "react";
import Modal from 'react-modal';

const ModalWindow = props => {
	return (<Modal {...props}>
		{props.children}
	</Modal>);
};

ModalWindow.propTypes = {
	children: PropTypes.object.isRequired
};

export default ModalWindow;
