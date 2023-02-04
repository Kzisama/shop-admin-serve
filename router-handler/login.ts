import { Request, Response } from "express";
// 处理密码
import bcrypt from "bcryptjs";
// 生产token
import jwt from "jsonwebtoken";
// 导入配置文件
import config from "../config";
import db from "../db";

// 用户-----登录
export const loginFn = (req: Request, res: Response) => {
	// 查询数据库中是否有该用户
	const userInfo = req.body;
	const sqlStr = `select * from user_table where username = ?`;
	db.query(sqlStr, userInfo.username, (err, results) => {
		err && res.send({ code: 1, msg: err.message });
		// 判断用户名是否正确
		results.length !== 1 && res.send({ code: 1, msg: "用户名错误" });
		// 判断密码是否正确,使用 bcrypt.compareSync 比较用户输入密码和数据中是否一致
		const compareRes = bcrypt.compareSync(
			userInfo.password,
			results[0].password
		);
		!compareRes && res.send({ code: 1, msg: "密码错误" });
		// 登录成功，剔除用户的敏感信息，并生成token
		const user = {
			...results[0],
			password: null,
			avatar: null,
			createtime: null,
			status: null,
			role: null,
		};
		const tokenStr = jwt.sign(user, config.jwtSecretKey, {
			expiresIn: config.duration, // 有效时长
		});
		res.send({
			code: 0,
			msg: "登陆成功",
			token: `Bearer ${tokenStr}`,
		});
	});
};
