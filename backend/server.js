const express = require("express");
const mysql = require("mysql");
const path = require("path");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const db_config = require("./config/db_config.json");
const app = express();
const cors = require("cors");

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
const processRoutes = require("./user/process");
const signupRoutes = require("./user/signup");
const clovaRoutes = require("./speech/clova");
const take_slang_dbRoutes = require("./speech/take_slang_db");

app.use("/", mypageRoutes);
app.use("/", loginRoutes);
app.use("/", processRoutes);
app.use("/", signupRoutes);
app.use("/", clovaRoutes);
app.use("/", take_slang_dbRoutes);

// 모든 요청은 build/index.html로
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT} 포트에서 실행 중입니다.`);
});
