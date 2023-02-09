import express, { Router } from "express";
// 路由处理函数
import {
	createFn,
	getInfoFn,
	updatePasswordFn,
	logoutFn,
	getRoutesFn,
	updateFn,
} from "../router-handler/user";

const router: Router = express.Router();

// 用户创建
router.post("/create", createFn);

// 获取用户信息
router.get("/info", getInfoFn);

// 修改用户信息
router.post("/update", updateFn);

// 修改用户密码
router.post("/updatepassword", updatePasswordFn);

// 用户退出
router.post("/logout", logoutFn);

// 获取用户路由
router.get("/routes", getRoutesFn);

export default router;
