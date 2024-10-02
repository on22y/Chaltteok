import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Loading.css";
import loadingImg from "../assets/images/loadingImg.png";
import TextComponent from "../components/TextComponent";
import axios from "axios";

function Loading() {
  const navigate = useNavigate();

  useEffect(() => {
    const nickname = localStorage.getItem("nickname"); // localStorage에서 닉네임 가져오기

    // API 호출
    const updateAge = async () => {
      try {
        console.log("내 닉네임", { nickname });
        const response = await axios.post("/loading/updateState", { nickname });
        console.log("서버 응답:", response.data);
      } catch (error) {
        console.error("나이 업데이트 중 오류 발생:", error);
      }
    };

    // 페이지 로드 시 나이 계산 로직 호출
    updateAge();

    // 3초 후에 다음 페이지로 이동
    const timer = setTimeout(() => {
      navigate("/islogged/type"); // 3초 후에 다음 페이지로 이동
    }, 3000);

    // 컴포넌트 언마운트 시 타이머 클리어
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loadingPage">
      <img className="imgComponent" src={loadingImg} width={198} />
      <TextComponent
        text={
          <>
            인터넷 나이
            <br />
            계산중
            <br />
            .........
          </>
        }
        fontSize="42px"
        strokeWidth="2px"
      />
    </div>
  );
}

export default Loading;
