import express, { Router } from "express";
import { noticePubFn, noticeGetFn } from "../router-handler/notice";

const router: Router = express.Router();

// 发布通知
router.post("/publish", noticePubFn);

// 获取通知
router.get("/getnotice", noticeGetFn);

export default router;
