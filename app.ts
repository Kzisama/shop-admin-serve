import express, {
	Express,
	Response,
	Request,
	NextFunction,
	Errback,
} from "express";

const app: Express = express();

// 配置跨域
import cors from "cors";
app.use(cors());

// 解析数据（JSON ，表单）
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 导入配置文件
import config from "./config";
// 配置解析token的中间件,此处用commonJS模块导入（不理解）
// 指定版本 "express-jwt": "5.3.3","jsonwebtoken": "8.5.1",
const expressJWT = require("express-jwt");
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
	expressJWT({ secret: config.jwtSecretKey }).unless({
		path: [/^\/api\//],
	})
);

// 用户登录
import loginRouter from "./router/login";
app.use("/api", loginRouter);

// 用户操作模块
import userRoute from "./router/user";
app.use("/user", userRoute);

// 捕获全局错误
app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
	// 捕获身份认证失败的错误
	if (err.name === "UnauthorizedError")
		return res.send({
			code: 401,
			msg: "身份验证失败",
			err,
		});
	// 其他错误
	if (err) {
		return res.send({ code: 1, msg: err });
	}
	next();
});

app.listen(8081, () => {
	console.log("serve is running on http://127.0.0.1:8081");
});
