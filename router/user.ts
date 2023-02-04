import express, { Router } from "express";
// 路由处理函数
import { createFn } from "../router-handler/user";

const router: Router = express.Router();

// 用户创建
router.post("/create", createFn);

export default router;
