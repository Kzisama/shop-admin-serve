import { Request, Response } from "express";
import moment from "moment";
import db from "../db";
// 处理密码
import bcrypt from "bcryptjs";

// 创建用户
export const createFn = (req: Request, res: Response) => {
	const userInfo = req.body;
	const sqlStr = "select username from user_table where username = ?";
	db.query(sqlStr, userInfo.username, (err, results) => {
		err && res.send({ code: 1, msg: err.message });
		results.length !== 0 && res.send({ code: 1, msg: "用户已存在" });
		// 符合要求，可以注册
		// 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
		userInfo.password = bcrypt.hashSync(userInfo.password, 5);
		// 插入到数据库中的数据
		const insertInfo = {
			...userInfo,
			character: "超级管理员",
			role: JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9]),
			createtime: moment().format(),
		};
		const sql = "insert into user_table set ?";
		db.query(sql, insertInfo, (err2, results2) => {
			err2 && res.send({ code: 1, msg: err2.message });
			results2.affectedRows !== 1 && res.send({ code: 1, msg: "创建用户失败" });
			// 创建成功
			res.send({
				code: 0,
				msg: "创建成功",
			});
		});
	});
};

// 获取用户信息
export const getInfoFn = (req: Request, res: Response) => {
	const sqlStr =
		"select id,username,avatar,createtime,role from user_table where id = ?";
	db.query(sqlStr, (req as any).user.id, (err, results) => {
		if (err) {
			return res.send({ code: 1, msg: err.message });
		}
		if (results.length !== 1) {
			return res.send({ code: 1, msg: "查询失败" });
		}
		res.send({ code: 0, msg: "获取用户信息成功", data: results[0] });
	});
};
