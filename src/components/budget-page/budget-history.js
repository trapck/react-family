import React from "react";
import LabelCover from "../common/label-cover";
import TextInput from "../common/text-input";
import TextAreaInput from "../common/text-area-input";
import NumberInput from "../common/number-input";
import DateInput from "../common/date-input";
import DropDownInput from "../common/dropdown-input";
import InputByColumnType from "../common/input-by-column-type";

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
				<InputByColumnType entityName = "expense" columnName = "title" onChange={this.onChange} value = {this.state.title}/>
				<InputByColumnType entityName = "expense" columnName = "description" onChange={this.onChange} value = {this.state.description}/>
				<InputByColumnType entityName = "expense" columnName = "date" onChange={this.onChange} value = {this.state.date}/>
				<InputByColumnType entityName = "expense" columnName = "amount" onChange={this.onChange} value = {this.state.amount}/>
				<InputByColumnType
					entityName = "expense"
					columnName = "category"
					onChange={this.onChange}
					value = {{
						value: "e51395b9-22f4-4d96-8efb-94d50181acc7",
						label: "Category22"
					}}
					lookupInfo = {{
						includeColumns: ["id"]
					}}
				/>
			</div>
		);
	}
}

export default History;
