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

// users 정보 불러오기
router.get("/getResult", (req, res) => {
  if (req.session && req.session.user) {
    const nickname = req.session.user?.nickname;

    // MySQL 쿼리를 통해 사용자 state 값 가져오기
    pool.query(
      "SELECT state FROM users WHERE nickname = ?",
      [nickname],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length > 0) {
          console.log({ state: results[0].state });
          return res.json({ state: results[0].state });
        } else {
          return res.status(404).json({ error: "User not found" });
        }
      }
    );
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

module.exports = router;
