import express, { Router } from "express";
// 路由处理函数
import { createFn, getInfoFn, updatePasswordFn } from "../router-handler/user";

const router: Router = express.Router();

// 用户创建
router.post("/create", createFn);

// 获取用户信息
router.get("/info", getInfoFn);

// 修改用户密码
router.post("/updatepassword", updatePasswordFn);

export default router;
