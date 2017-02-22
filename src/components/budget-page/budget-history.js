import React from "react";
import LabelCover from "../common/label-cover";
import TextInput from "../common/text-input";

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {textValue: ""};
		this.onChange = this.onChange.bind(this);
	}
	onChange(value, e) {
		console.log(value, e);
		this.setState({textValue: value});
	}
	render() {
		return (
			<div>
				<div>History</div>
				<LabelCover caption="Title">
					<TextInput value = {this.state.textValue} onChange={this.onChange}/>
				</LabelCover>
			</div>
		);
	}
}

export default History;
