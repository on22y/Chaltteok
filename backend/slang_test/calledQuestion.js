const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db_config = require("../config/db_config.json");

// MySQL 연결 설정
const pool = mysql.createPool({
  connectionLimit: 10,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

router.post("/calledQuestion", (req, res) => {
  if (req.session && req.session.user) {
    const questionNum = req.body.num; // 프론트엔드에서 넘겨준 num 값

    pool.getConnection((err, conn) => {
      if (err) {
        console.error("MySQL Connection Error", err);
        res.status(500).json({ success: false, message: "DB 서버 연결 실패" });
        return;
      }

      const query = "SELECT text1, text2, value FROM question WHERE id = ?"; // value도 함께 가져옴
      conn.query(query, [questionNum], (error, results) => {
        conn.release();
        if (error) {
          console.error("Query Error", error);
          res.status(500).json({ success: false, message: "Query 실패" });
          return;
        }

        if (results.length > 0) {
          res.json({
            text1: results[0].text1,
            text2: results[0].text2,
            value: results[0].value, // value 값을 프론트엔드로 전달
          });
        } else {
          res
            .status(404)
            .json({ success: false, message: "데이터가 없습니다." });
        }
      });
    });
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

module.exports = router;
