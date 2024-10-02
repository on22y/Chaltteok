// logged_result.js
const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db_config = require("../config/db_config.json");

// Database pool 설정
const pool = mysql.createPool({
  connectionLimit: 50,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

// 로그인한 사용자의 state 값을 반환하는 API
router.post("/getResult", (req, res) => {
  if (req.session && req.session.user) {
    const nickname = req.session.user.nickname;

    // MySQL 쿼리를 통해 사용자 state 값 가져오기
    pool.query(
      "SELECT state FROM users WHERE nickname = ?",
      [nickname],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length > 0) {
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
