import { Request, Response } from "express";
import moment from "moment";
import db from "../db";
import { admin, saleMan } from "../roles";
// 处理密码
import bcrypt from "bcryptjs";
import { useGetUserRoutes } from "../hooks";
import path from "path";

// 创建用户
export const createFn = (req: Request, res: Response) => {
  const userInfo = req.body;

  const sqlStr = "select username from user_table where username = ?";
  db.query(sqlStr, userInfo.username, (err, results) => {
    if (err) {
      return res.send({ code: 1, msg: err.message });
    }
    if (results.length !== 0) {
      return res.send({ code: 1, msg: "用户已存在" });
    }
    // 符合要求，可以注册
    // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
    userInfo.password = bcrypt.hashSync(userInfo.password, 5);
    // 用户身份
    let userRole: number[] = [];
    switch (userInfo.character) {
      case "管理员":
        userRole = admin;
        break;
      case "销售":
        userRole = saleMan;
        break;
      default:
        break;
    }
    // 插入到数据库中的数据
    const insertInfo = {
      ...userInfo,
      role: JSON.stringify(userRole),
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
        msg: "创建用户成功",
      });
    });
  });
};

// 获取用户信息（指定ID）
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

// 获取全部用户信息
export const getInfoAllFn = (req: Request, res: Response) => {
  const sqlStr = "select * from user_table";
  db.query(sqlStr, (req as any).user.userID, (err, results) => {
    if (err) {
      return res.send({ code: 1, msg: err.message });
    }
    results.forEach((item: any) => {
      item.password = null;
      item.role = null;
    });
    res.send({
      code: 0,
      msg: "获取成功",
      data: results,
    });
  });
};

// 修改用户信息
export const updateFn = (req: Request, res: Response) => {
  const userInfo = req.body;
  const sqlStr = "update user_table set ? where userID = ?";
  db.query(sqlStr, [userInfo, (req as any).user.userID], (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message });
    if (results.affectedRows !== 1)
      return res.send({ code: 1, msg: "修改失败" });
    res.send({ code: 0, msg: "修改成功" });
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

// 获取全部路由
export const getAllRoutesFn = (req: Request, res: Response) => {
  if ((req as any).user.character === "超级管理员") {
    const sqlStr = "select * from route_table";
    db.query(sqlStr, (err, results) => {
      if (err) return res.send({ code: 1, msg: err.message });
      res.send({ code: 0, msg: "获取路由成功", data: results });
    });
  } else {
    res.send({ code: 1, msg: "无访问权限" });
  }
};

// 获取角色-权限表数据
export const getRoleFn = (req: Request, res: Response) => {
  const sqlStr = "select * from role_table";
  db.query(sqlStr, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message });
    res.send({ code: 0, msg: "获取权限表成功", data: results });
  });
};

// 新增职位
export const addCharacterFn = (req: Request, res: Response) => {
  const characterInfo = req.body;
  const sqlStr = "select `character` from role_table where `character` = ?";
  db.query(sqlStr, characterInfo.character, (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message });
    if (results.length !== 0) return res.send({ code: 1, msg: "职位已存在" });
    const str = "insert into role_table set ?";
    db.query(str, characterInfo, (err2, results2) => {
      if (err2) return res.send({ code: 1, msg: err2.message });
      if (results2.affectedRows !== 1)
        return res.send({ code: 1, msg: "新增职位失败" });
      res.send({ code: 0, msg: "新增职位成功" });
    });
  });
};

// 修改职位信息
export const setCharacterFn = (req: Request, res: Response) => {
  const characterInfo = req.body;
  const sqlStr = "update role_table set ? where id = ?";
  db.query(sqlStr, [characterInfo, characterInfo.id], (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message });
    if (results.affectedRows !== 1)
      return res.send({ code: 1, msg: "修改失败" });
    res.send({ code: 0, msg: "修改成功" });
  });
};

// 修改职位权限
export const setRolesFn = (req: Request, res: Response) => {
  const { roles, id } = req.body;
  const sqlStr = "update role_table set roles = ? where id = ?";
  db.query(sqlStr, [roles, id], (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message });
    if (results.affectedRows !== 1)
      return res.send({ code: 1, msg: "分配权限失败" });
    res.send({ code: 0, msg: "分配权限成功" });
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

      // 获取用户拥有路由
      const userRoutes = useGetUserRoutes(results[0].role, results2);

      res.send({
        code: 0,
        msg: "获取路由成功",
        data: {
          userRoutes,
        },
      });
    });
  });
};

// 更新用户头像
export const updateAvatarFn = (req: Request, res: Response) => {
  const avatar = path.join("/avatar", (req as any).file.filename);
  const sqStr = "update user_table set avatar = ? where userID = ?";
  db.query(sqStr, [avatar, (req as any).user.userID], (err, results) => {
    if (err) return res.send({ code: 1, msg: err.message });
    if (results.affectedRows !== 1)
      return res.send({ code: 1, msg: "修改头像失败" });
    res.send({ code: 0, msg: "修改头像成功" });
  });
};
