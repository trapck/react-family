import express from "express";
import webpack from "webpack";
import path from "path";
import config from "../webpack.config.dev";
import open from "open";
import fs from "fs";
import bodyParser from "body-parser";
import {syncDb} from "../other/utils";

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require("webpack-dev-middleware")(compiler, {
	noInfo: true,
	publicPath: config.output.publicPath
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(require("webpack-hot-middleware")(compiler));

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

app.get("*", function(req, res) {
	res.sendFile(path.join( __dirname, "../src/index.html"));
});

app.listen(port, function(err) {
	if (err) {
		console.log(err);
	} else {
		open(`http://localhost:${port}`);
	}
});
