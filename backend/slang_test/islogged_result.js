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

// 비로그인 사용자의 state 값을 반환하는 API
router.post("/getResult", (req, res) => {
  const nickname = req.session.user?.nickname; // 세션에서 닉네임 가져오기

  if (!nickname) {
    return res.status(400).json({ error: "User not logged in" });
  }

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
});

module.exports = router;
