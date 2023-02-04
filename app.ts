import express, { Express } from "express";

const app: Express = express();

app.listen(8081, () => {
	console.log("serve is running on http://127.0.0.1:8081");
});
