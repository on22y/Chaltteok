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
    const questionCount = req.body.count || 10; // 가져올 문제 개수를 프론트엔드에서 넘겨줌, 기본 10개

    pool.getConnection((err, conn) => {
      if (err) {
        console.error("MySQL Connection Error", err);
        res.status(500).json({ success: false, message: "DB 서버 연결 실패" });
        return;
      }

      // 랜덤하게 questionCount 개의 문제를 가져옴, 중복 허용하지 않음
      const query = `SELECT id, text1, text2, value FROM question ORDER BY RAND() LIMIT ?`;
      conn.query(query, [questionCount], (error, results) => {
        conn.release();
        if (error) {
          console.error("Query Error", error);
          res.status(500).json({ success: false, message: "Query 실패" });
          return;
        }

        if (results.length > 0) {
          res.json({
            questions: results, // 여러 문제를 배열로 반환
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
