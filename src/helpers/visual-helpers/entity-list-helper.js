import React from "react";
import {getEntityColumnsCaptions} from "../../../other/utils";

export default {
	createTableList(
		entityItemComponent,
		entities = [],
		entityName = "",
		onValuedUpdated = Function.prototype,
		additionalRightCells = [],
		additionalLeftCells = [],
		excludedCaptions = [],
		cssTableClassName = ""
	) {
		return (
			<table className = {cssTableClassName}>
				<tbody>
				<tr>
					{getEntityColumnsCaptions(entityName, excludedCaptions).map((c, i) => <th key={i}>{c}</th>)}
				</tr>
				{entities.map((e, i) => {
					return React.createElement(entityItemComponent, {
						key: e.id,
						entity: e,
						onValueChange: onValuedUpdated,
						additionalRightCells: additionalRightCells.map(c => c[i]),
						additionalLeftCells: additionalLeftCells.map(c => c[i])
					});
				})}
				</tbody>
			</table>
		);
	}
};
