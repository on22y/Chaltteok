const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db_config = require("../config/db_config.json");

// MySQL 연결 설정
const pool = mysql.createPool({
  connectionLimit: 50,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

router.post("/Logged/answer", (req, res) => {
  if (req.session && req.session.user) {
    const user_nickname = req.session.user.nickname;

    // 해당 닉네임에 맞는 데이터를 위에서부터 순차적으로 가져옴
    pool.query(
      "SELECT * FROM user_answers WHERE nickname = ? ORDER BY created_at ASC",
      [user_nickname],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Database query failed" });
        }

        if (results.length > 0) {
          return res.json({
            answers: results.map((result) => ({
              word: result.word,
              about_word: result.meaning,
              answer: result.answer,
              question: result.question,
            })),
          });
        } else {
          return res.status(404).json({ error: "User not found" });
        }
      }
    );
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

//로그인 한 사람들 답변 정보 삭제
router.post("/Logged/deleteAnswers", (req, res) => {
  if (req.session && req.session.user) {
    const user_nickname = req.session.user.nickname;

    // user_answers 테이블에서 해당 닉네임의 모든 행 삭제
    pool.query(
      "DELETE FROM user_answers WHERE nickname = ?",
      [user_nickname],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: "Database deletion failed" });
        }

        return res.json({
          message: "All answers for the user have been deleted successfully",
        });
      }
    );
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
});

//비로그인
router.post("/isLogged/answer/calledAnswer", (req, res) => {
  const questionId = req.body.id; // 가져올 문제의 ID를 프론트엔드에서 넘겨줌

  if (!questionId) {
    return res
      .status(400)
      .json({ success: false, message: "ID가 필요합니다." });
  }

  pool.getConnection((err, conn) => {
    if (err) {
      console.error("MySQL Connection Error", err);
      res.status(500).json({ success: false, message: "DB 서버 연결 실패" });
      return;
    }

    // answer, slang_word, meaning을 선택적으로 가져오기
    const query = `SELECT answer, slang_word, meaning FROM question WHERE id = ?`;
    conn.query(query, [questionId], (error, results) => {
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
        res.status(404).json({ success: false, message: "데이터가 없습니다." });
      }
    });
  });
});

module.exports = router;
