const express = require("express");
const multer = require("multer");
const axios = require("axios");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 5000;

// CORS 설정 (클라이언트와 백엔드가 다른 포트에 있을 때 필요)
app.use(cors());

// Multer 설정 (파일 업로드 처리)
const upload = multer({ dest: "uploads/" });

// 네이버 클로바 Speech API 설정
const CLOVA_URL = "https://clovaspeech-gw.ncloud.com/external/v1/recognize";
const CLIENT_ID = "hanul"; // 클로바 Speech API 클라이언트 ID
const CLIENT_SECRET = "https://clovaspeech-gw.ncloud.com/recog/v1/stt"; // 클라이언트 Secret

// 파일을 받아서 클로바 Speech API 호출
app.post("/api/speech-to-text", upload.single("audio"), async (req, res) => {
  const audioFile = req.file;

  try {
    const audioData = fs.readFileSync(audioFile.path);

    // 클로바 API 요청 설정
    const response = await axios.post(CLOVA_URL, audioData, {
      headers: {
        "Content-Type": "application/octet-stream",
        "X-NCP-APIGW-API-KEY-ID": CLIENT_ID,
        "X-NCP-APIGW-API-KEY": CLIENT_SECRET,
        "X-DOMAIN-ID": "hanul", // 클로바 Speech API 도메인 ID
      },
      params: {
        lang: "Kor", // 한국어 설정 (필요에 따라 조정)
      },
    });

    // API 응답의 텍스트 반환
    const transcript = response.data.text;
    res.json({ text: transcript });
  } catch (error) {
    console.error("Error in Speech-to-Text API:", error);
    res.status(500).json({ error: "Failed to process the audio" });
  } finally {
    // 업로드된 파일 삭제
    fs.unlinkSync(audioFile.path);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
