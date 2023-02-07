import { Request, Response } from "express";
import moment from "moment";
import db from "../db";
// 处理密码
import bcrypt from "bcryptjs";
import { resolve } from "path";

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
			if (err2) {
				return res.send({ code: 1, msg: err2.message });
			}
			if (results2.affectedRows !== 1) {
				return res.send({ code: 1, msg: "创建用户失败" });
			}
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
	const sqlStr = "select * from user_table where userID = ?";
	db.query(sqlStr, (req as any).user.userID, (err, results) => {
		if (err) {
			return res.send({ code: 1, msg: err.message });
		}
		if (results.length !== 1) {
			return res.send({ code: 1, msg: "查询失败" });
		}
		res.send({
			code: 0,
			msg: "获取用户信息成功",
			data: { ...results[0], password: null },
		});
	});
};

// 修改用户密码
export const updatePasswordFn = (req: Request, res: Response) => {
	const userInfo = req.body;
	const sqlStr = "select * from user_table where userID = ?";
	db.query(sqlStr, (req as any).user.userID, (err, results) => {
		if (err) return res.send({ code: 1, msg: err.message });
		if (results.length !== 1) return res.send({ code: 1, msg: "未知用户" });
		// 判断原密码和数据库中是否一致
		const finalCompare = bcrypt.compareSync(
			userInfo.oldpassword,
			results[0].password
		);
		// 判断新密码和确认新密码是否一致
		const reqCompare = userInfo.password === userInfo.repassword;
		// 判断新密码和原密码是否一致
		const compareRes = userInfo.password === userInfo.oldpassword;

		// 新旧密码不一致 并且 新密码和确认密码一致
		if (finalCompare && reqCompare && !compareRes) {
			userInfo.password = bcrypt.hashSync(userInfo.password, 5);
			const sql = "update user_table set password = ? where userID = ?";
			db.query(
				sql,
				[userInfo.password, (req as any).user.userID],
				(err2, results2) => {
					if (err2) return res.send({ code: 1, msg: err2.message });
					if (results2.affectedRows !== 1)
						return res.send({ code: 1, msg: "修改失败" });
					res.send({ code: 0, msg: "修改密码成功" });
				}
			);
		} else {
			res.send({ code: 1, msg: "原密码或确认密码错误" });
		}
	});
};

// 用户退出
export const logoutFn = (req: Request, res: Response) => {
	const sqlStr = "update user_table set status = 0 where userID = ?";
	db.query(sqlStr, (req as any).user.userID, (err, results) => {
		if (err) return res.send({ code: 1, msg: err.message });
		if (results.affectedRows !== 1)
			return res.send({ code: 1, msg: "退出失败" });
		res.send({ code: 0, msg: "退出成功" });
	});
};

// 获取用户路由
export const getRoutesFn = (req: Request, res: Response) => {
	const sqlStr = "select role from user_table where userID = ?";
	db.query(sqlStr, (req as any).user.userID, (err, results) => {
		if (err) return res.send({ code: 1, msg: err.message });
		if (results.length !== 1) return res.send({ code: 1, msg: "未知用户" });

		const sql = "select * from route_table";
		db.query(sql, (err2, results2) => {
			if (err2) return res.send({ code: 1, msg: err2.message });
			res.send({
				code: 0,
				msg: "获取路由成功",
				data: {
					role: results[0].role,
					allRoutes: results2,
				},
			});
		});
	});
};
