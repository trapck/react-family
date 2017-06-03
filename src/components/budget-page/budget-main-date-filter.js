import React, {PropTypes} from "react";
import DropDownInput from "../common/dropdown-input";
import months from "../../static-data/months";

const BudgetMainDateFilter = props => {
	return (
		<div>
			<DropDownInput
				value = {props.monthValue}
				options = {months.data.map(m => {return {label: m.title, value: m.number};})}
				onChange = {props.onMonthChange}
				containerClassName = {"current-month-edit-container"}
				isFocusCanceled
				/>
			<div className = {"current-year-edit-container"}>
				<input
					type = {"number"}
					onChange = {props.onYearChange}
					value = {props.yearValue}
					className = "current-year-edit"
					/>
			</div>
		</div>
	);
};

BudgetMainDateFilter.propTypes = {
	monthValue: PropTypes.object.isRequired,
	onMonthChange: PropTypes.func,
	yearValue: PropTypes.number.isRequired,
	onYearChange: PropTypes.func
};

BudgetMainDateFilter.defaultProps = {
	onMonthChange: Function.prototype,
	onYearChange: Function.prototype
};

export default BudgetMainDateFilter;
