import express from "express";
import webpack from "webpack";
import path from "path";
import config from "../webpack.config.dev";
import open from "open";
import fs from "fs";
import bodyParser from "body-parser";
import {
	syncDb,
	createFilterFunction,
	getFormatedDate
} from "../other/utils";

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);
const dbPath = path.join( __dirname, "db.json");
const dbBackupPath = path.join( __dirname, "dbBak");
const makeBackupInterval = 1000 * 60 * 30;

const startMakeDBBackupJob = () => {
	setInterval(() => {
		if (!fs.existsSync(dbBackupPath)){
			fs.mkdirSync(dbBackupPath);
		}
		const dateDirName = new Date().toLocaleDateString().replace(/[^\d]/g, ""),
			filePath  = path.join( dbBackupPath, dateDirName, "db" + Date.now() + ".bak.json");
		if (!fs.existsSync(path.join(dbBackupPath, dateDirName))){
			fs.mkdirSync(path.join(dbBackupPath, dateDirName));
		}
		fs.createReadStream(dbPath).pipe(fs.createWriteStream(filePath, {flags: "w+"}));
	}, makeBackupInterval);
};
app.use(require("webpack-dev-middleware")(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(require("webpack-hot-middleware")(compiler));

app.post("/select", (req, res) => {
	const db = JSON.parse(fs.readFileSync(path.join( __dirname, "db.json"))),
		data = req.body.data,
		result = {};
	for (let obj of data) {
		let entities = db[obj.entityName].filter(createFilterFunction(obj.entityName, obj.filters));
		result[obj.entityName] = entities;
	}
	res.send(JSON.stringify({data: result}));
});

// TODO: implement make backup
app.post("/syncDb", function(req, res) {
	const db = JSON.parse(fs.readFileSync(path.join( __dirname, "db.json"))),
		entityName = req.body.entity,
		data = req.body.data;
	syncDb(entityName, data, db);
	fs.writeFileSync(path.join( __dirname, "db.json"), JSON.stringify(db));
	res.send(JSON.stringify({success: true}));
});

app.get("/syncDb", function(req, res) {
	const db = JSON.parse(fs.readFileSync(path.join( __dirname, "db.json"))),
		entityName = req.query.entity;
	res.send(JSON.stringify({[entityName]: db[entityName]}));
});

app.get("/year-chart-info", (req, res) => {
	const db = JSON.parse(fs.readFileSync(path.join( __dirname, "db.json"))),
		result = [];
	let nowMonth = new Date().getMonth(),
		nowYear = new Date().getFullYear(),
		monthCount = req.query.monthCount || 12;
	while(monthCount) {
		let amount = db.expense
			.filter(e => new Date(e.date).getMonth() === nowMonth && new Date(e.date).getFullYear() === nowYear)
			.reduce((total, item) => total + item.amount, 0),
			month = ((nowMonth + 1) > 9 ? nowMonth + 1 : "0" + (nowMonth + 1)) + "." + nowYear;
		result.push({
			month,
			amount
		});
		if (nowMonth === 0) {
			nowMonth = 11;
			nowYear--;
		} else {
			nowMonth--;
		}
		monthCount--;
	}
	res.send(JSON.stringify({data: [...result].reverse()}));
});

app.get("*", function(req, res) {
	res.sendFile(path.join( __dirname, "../src/index.html"));
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		open(`http://localhost:${port}`);
		startMakeDBBackupJob();
	}
});
