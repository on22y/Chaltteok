const express = require("express");
const mysql = require("mysql");
const router = express.Router();
const db_config = require("../config/db_config.json");

// MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 50,
  host: db_config.host,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
  port: db_config.port,
  debug: false,
});

router.get("/word/check/:id", (req, res) => {
  const wordId = req.params.id;
  if (!wordId) {
    console.error("Word ID is undefined");
    return res
      .status(400)
      .json({ error: "Invalid request: wordId is required" });
  }

  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Database connection error:", err.message); // 내부 로그는 그대로
      return res.status(500).json({ error: "Internal server error" });
    }

    conn.query(
      "SELECT * FROM user_make_data WHERE id = ?",
      [wordId],
      (err, results) => {
        conn.release();
        if (err) {
          console.error("Error fetching data:", err.message);
          return res.status(500).json({ error: "Internal server error" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "No data found" });
        }

        res.json(results[0]);
      }
    );
  });
});

router.post("/approve", (req, res) => {
  const { id, action } = req.body;
  if (!id || !action) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Invalid request: id and action are required",
      });
  }

  pool.getConnection((err, conn) => {
    if (err) {
      console.error("Database connection error:", err.message);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }

    const status = action === "approve" ? 1 : 0; // 예: 1 = 승인, 0 = 반려
    const query = "UPDATE user_make_data SET status = ? WHERE id = ?";

    conn.query(query, [status, id], (err, results) => {
      conn.release();
      if (err) {
        console.error("Error updating word status:", err.message);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }

      if (results.affectedRows === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Word not found" });
      }

      res.json({
        success: true,
        message:
          action === "approve"
            ? "Word successfully approved."
            : "Word successfully rejected.",
      });
    });
  });
});

module.exports = router;
