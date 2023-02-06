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
	const sqlStr = `select * from user_table where username = ?;update user_table set status = 1 where username = ?`;
	db.query(sqlStr, [userInfo.username, userInfo.username], (err, results) => {
		if (err) {
			return err && res.send({ code: 1, msg: err.message });
		}

		if (results[0].length !== 1) {
			// 判断用户名是否正确
			return res.send({ code: 1, msg: "用户名错误" });
		}

		if (results[1].affectedRows !== 1) {
			return res.send({ code: 1, msg: "出错了" });
		}

		// 判断密码是否正确,使用 bcrypt.compareSync 比较用户输入密码和数据中是否一致
		const compareRes = bcrypt.compareSync(
			userInfo.password,
			results[0][0].password
		);
		if (!compareRes) {
			return res.send({ code: 1, msg: "密码错误" });
		}
		// 登录成功，剔除用户的敏感信息，并生成token
		const user = {
			...results[0][0],
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
