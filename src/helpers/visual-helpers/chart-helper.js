"use strict";

const generateRandomColor = () => {
	const symbols = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
	let result = "#";
	for (let i = 0; i < 6; i++) {
		let random = Math.floor(Math.random() * symbols.length);
		result += symbols[random];
	}
	return result;
};

export {generateRandomColor};
