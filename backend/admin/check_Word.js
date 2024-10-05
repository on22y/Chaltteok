// 제보된 단어 정보를 서버에서 불러오고, 해당 단어를 등록 및 반려하는 코드

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

// 단어 정보 확인 및 불러오기
router.get('/', (req, res) => {
  const wordId = req.query.id; // id는 쿼리 스트링 또는 다른 방식으로 받아올 수 있습니다.
  console.log('back', wordId);
  pool.getConnection((err, conn) => {
    if (err) {
      console.error('데이터 조회 중 에러 발생:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }

    conn.query('SELECT * FROM user_make_data WHERE id = ?', [wordId], (err, results) => {
      conn.release();
      if (err) {
        console.error('데이터 조회 중 에러 발생:', err);
        return res.status(500).json({ error: 'Database query failed' });
      }
      res.json(results[0] || {}); // 결과가 없으면 빈 객체 반환
    });
  });
});

// 단어 등록 및 반려하기
router.post('/approve', (req, res) => {
  const { id, action } = req.body; // action: 'approve' 또는 'reject'

  pool.getConnection((err, conn) => {
    if (err) {
      console.error('Database connection error', err);
      return res.status(500).json({ success: false, message: 'DB 서버 연결 실패' });
    }

    if (action === 'approve') {
      // 승인 처리 로직, 데이터베이스 변경 없이 기타 처리를 수행
      console.log(`Word id ${id} approved.`);
      res.json({ success: true, message: '단어가 성공적으로 승인되었습니다.' });
    } else if (action === 'reject') {
      // 반려 처리 로직, 데이터베이스 변경 없이 기타 처리를 수행
      console.log(`Word id ${id} rejected.`);
      res.json({ success: true, message: '단어가 성공적으로 반려되었습니다.' });
    } else {
      res.status(400).json({ success: false, message: '잘못된 요청입니다.' });
    }

    conn.release();
  });
});

module.exports = router;
