import express, { Router } from "express";
// 路由处理函数
import { createFn, getInfoFn } from "../router-handler/user";

const router: Router = express.Router();

// 用户创建
router.post("/create", createFn);

// 获取用户信息
router.get("/info", getInfoFn);

export default router;
