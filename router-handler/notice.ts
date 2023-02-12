import { Request, Response } from "express";
import db from "../db";

// 发布通知
export const noticePubFn = (req: Request, res: Response) => {
	// 通知信息
	const noticeInfo = {
		...req.body,
		pubtime: new Date(),
		publisher: (req as any).user.username,
	};

	const sqlStr = "insert into notice_table set ?";
	db.query(sqlStr, noticeInfo, (err, results) => {
		if (err) return res.send({ code: 1, msg: err.message });
		if (results.affectedRows !== 1)
			return res.send({ code: 1, msg: "发布失败" });
		res.send({
			code: 0,
			msg: "发布成功",
		});
	});
};

// 获取通知
export const noticeGetFn = (req: Request, res: Response) => {
	const sqlStr = "select * from notice_table where status = 0";
	db.query(sqlStr, (err, resultes) => {
		if (err) return res.send({ code: 1, msg: err.message });
		res.send({
			code: 0,
			msg: "获取通知列表成功",
			data: resultes,
		});
	});
};

// 删除通知
export const noticeDelFn = (req: Request, res: Response) => {
	const delNoticeID = req.body.noticeID;
	const sqlStr = "update notice_table set status = 1 where noticeID = ?";
	db.query(sqlStr, delNoticeID, (err, results) => {
		if (err) return res.send({ code: 1, msg: err.message });
		if ((req as any).user.character !== "超级管理员")
			return res.send({ code: 1, msg: "没有权限" });
		res.send({ code: 0, msg: "删除通知成功" });
	});
};
