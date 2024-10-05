// 제보된 단어 정보(단어, 유행년도, 첫 번째 예시 대화)를 서버에서 불러와 단어 목록에 추가하는 코드

const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const router = express.Router();
const db_config = require('../config/db_config.json');

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

// 단어 목록 불러오기
router.get('/word/list', (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.error('데이터베이스 연결 중 오류 발생:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }

    // 모든 단어 목록 조회 쿼리
    conn.query('SELECT id, word, year, text1 FROM user_make_data', (err, results) => {
      conn.release();
      if (err) {
        console.error('데이터 조회 중 오류 발생:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }

      // 결과가 없을 경우 빈 배열 반환
      if (!results || results.length === 0) {
        return res.json([]);
      }
      // 결과가 있으면 그대로 반환
      res.json(results);
    });
  });
});

module.exports = router;
