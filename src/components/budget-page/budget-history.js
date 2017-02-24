import React from "react";
import LabelCover from "../common/label-cover";
import TextInput from "../common/text-input";
import NumberInput from "../common/number-input";
import DateInput from "../common/date-input";
import DropDownInput from "../common/dropdown-input";

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
		let options = ["apple", "mango", "grapes", "melon", "strawberry"].map(function(fruit){
			return {label: fruit, value: fruit};
		});
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
				<LabelCover caption="Date">
					<DateInput value = {this.state.date} onChange={this.onChange} tag = "date"/>
				</LabelCover>
				<LabelCover caption="DropDown">
					<DropDownInput
						options = {options}
						onChange = {this.onChange}
						defaultValue = {{label: "apple", value: "apple"}}
						tag = "list"
					/>
				</LabelCover>
			</div>
		);
	}
}

export default History;
