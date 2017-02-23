import React from "react";
import LabelCover from "../common/label-cover";
import TextInput from "../common/text-input";
import NumberInput from "../common/number-input";

class History extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.onChange = this.onChange.bind(this);
	}
	onChange(tag, value, e) {
		this.setState(Object.assign({}, this.state, {[tag]: value}));
	}

	render() {
		return (
			<div>
				<div>History</div>
				<LabelCover caption="Text">
					<TextInput value = {this.state.text} onChange={this.onChange} tag = "text"/>
				</LabelCover>
				<LabelCover caption="Integer Negative">
					<NumberInput value = {this.state.negInt} onChange={this.onChange} isInteger isNegativeAllowed tag = "negInt"/>
				</LabelCover>
				<LabelCover caption="Integer">
					<NumberInput value = {this.state.int} onChange={this.onChange} isInteger tag = "int"/>
				</LabelCover>
				<LabelCover caption="Negative">
					<NumberInput value = {this.state.neg} onChange={this.onChange} isNegativeAllowed tag = "neg"/>
				</LabelCover>
				<LabelCover caption="Positive number">
					<NumberInput value = {this.state.number} onChange={this.onChange} tag = "number"/>
				</LabelCover>
			</div>
		);
	}
}

export default History;
