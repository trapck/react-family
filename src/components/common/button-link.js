import React, {PropTypes} from "react";
import Button from "./button";

class ButtonLink extends Button {
	onClick(e) {
		e.preventDefault();
		e.stopPropagation();
		super.onClick(e);
	}

	render() {
		return (
			<a href = "#" onClick = {this.onClick} className = {this.props.className}>
				{this.props.caption}
			</a>);
	}
}

ButtonLink.defaultProps.className = "button-link";

export default ButtonLink;
