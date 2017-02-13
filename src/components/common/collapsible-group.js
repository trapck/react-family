import React, {PropTypes} from "react";

class CollapsibleGroup extends React.Component {
	constructor(props) {
		super(props);
		if (!props.hasOwnProperty("isCollapsed")) {
			this.state = {
				isCollapsed: true
			};
		}
		this.onHeaderClick = this.onHeaderClick.bind(this);
	}

	onHeaderClick() {
		const children = React.Children.toArray(this.props.children);
		if (children[0].props.onHeaderClick) {
			children[0].props.onHeaderClick(!children[0].props.isCollapsed);
		} else {
			this.setState({isCollapsed: !this.state.isCollapsed});
		}
	}

	createHeader() {
		const caption = this.props.headerCaption || "undefined caption",
			preventFn = e => e.preventDefault();
		return (
			<a href = "#" className = "link" onClick = {preventFn}>
				{caption}
			</a>
		);
	}

	render() {
		const children = React.Children.toArray(this.props.children),
			isNativeHeader = children.length < 2,
			isContentVisible = children[0].props.hasOwnProperty("isCollapsed") ?
				!children[0].props.isCollapsed :
				!this.state.isCollapsed;
		let header = isNativeHeader ? this.createHeader() : children[0],
			content = isContentVisible ? (isNativeHeader ? children[0] : children[1]) : null;
		return (
			<div>
				<div className = "collapsible-group-header" onClick = {this.onHeaderClick}>
					{header}
				</div>
				<div className = "collapsible-group-content">
					{content}
				</div>
			</div>
		);
	}
}

CollapsibleGroup.propTypes = {
	children: PropTypes.array.isRequired,
	headerCaption: PropTypes.string,
	isCollapsed: PropTypes.bool,
	onHeaderClick: PropTypes.func
};

export default CollapsibleGroup;
