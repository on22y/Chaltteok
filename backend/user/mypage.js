const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const router = express.Router();
const db_config = require("../config/db_config.json");
const app = express();

// Database connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

// 로그인 여부 확인 미들웨어
const checkLogin = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

// users 정보 불러오기
router.get("/", checkLogin, (req, res) => {
  const userNickname = req.session.user && req.session.user.nickname;
  if (!userNickname) {
    return res.status(401).send("Unauthorized");
  }

  pool.getConnection((err, conn) => {
    if (err) {
      console.log("MySQL Connection Error", err);
      if (conn) conn.release();
      return res.status(500).send("DB 서버 연결 실패");
    }

    const userQuery = "SELECT * FROM users WHERE nickname = ?";
    conn.query(userQuery, [userNickname], (err, userRows) => {
      conn.release();
      if (err) {
        console.log("SQL 실행 시 오류 발생", err);
        return res.status(500).send("사용자 정보 가져오기 실패");
      }

      if (userRows.length > 0) {
        res.json(userRows[0]);
      } else {
        res.status(404).send("사용자 정보가 존재하지 않습니다.");
      }
    });
  });
});

app.use("/mypage", router);
module.exports = router;
