const express = require("express");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const db_config = require("./config/db_config.json");
const app = express();
const cors = require("cors");
require("dotenv").config();

const expressSanitizer = require("express-sanitizer");

// fs and https 모듈 가져오기
const https = require("https");
const fs = require("fs");

// certificate와 private key 가져오기
// ------------------- STEP 2
const options = {
  key: fs.readFileSync(path.join(__dirname, "config", "cert.key")),
  cert: fs.readFileSync(path.join(__dirname, "config", "cert.crt")),
};

// MySQL 세션 스토어 옵션
const sessionStoreOptions = {
  host: db_config.host,
  port: db_config.port,
  user: db_config.user,
  password: db_config.password,
  database: db_config.database,
};

const sessionStore = new MySQLStore(sessionStoreOptions);

// URL을 인코딩하는 코드
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const sessionMiddleware = session({
  key: "session_cookie_name",
  secret: "your_secret_key",
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1 * 60 * 60 * 1000, // 1시간 (1시간 * 60분 * 60초 * 1000밀리초)
  },
});

app.use(sessionMiddleware);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(express.static(path.join(__dirname, "public")));

// js파일 연동
const mypageRoutes = require("./user/mypage");
const loginRoutes = require("./user/login");
const processRoutes = require("./user/check-login");
const signupRoutes = require("./user/signup");

app.use("/", mypageRoutes);
app.use("/", loginRoutes);
app.use("/", processRoutes);
app.use("/", signupRoutes);

// 모든 요청은 build/index.html로
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/build", "index.html"));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});

https.createServer(options, app).listen(3001, () => {
  console.log(`HTTPS server started on port 3001`);
});
