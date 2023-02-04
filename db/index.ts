import mysql, { Connection } from "mysql";

const db: Connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "admin123",
	database: "shop-admin",
});

export default db;
