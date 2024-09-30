import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";
import MainBtn from "../components/MainBtn";
import BoxComponent from "../components/BoxComponent";
import TextComponent from "../components/TextComponent";
import mainImg from "../assets/images/mainImg.png";
import UnderlineBtn from "../components/UnderlineBtn";

function Home() {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 페이지 로드 시 현재 참여자 수 가져오기
    axios
      .get("/api/get-count")
      .then((response) => {
        setCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching count:", error);
      });
  }, []);

  const handleLogin = () => {
    navigate("/loginpage");
  };

  const handleTestClick = () => {
    // 진단하기 버튼 클릭 시 카운트를 증가시키고 다음 페이지로 이동
    axios
      .post("/api/increase-count")
      .then((response) => {
        setCount(response.data.count); // 업데이트된 카운트로 상태 업데이트
        navigate("/isLogged/test");
      })
      .catch((error) => {
        console.error("Error increasing count:", error);
      });
  };

  return (
    <div className="homePage">
      <UnderlineBtn
        subText="테스트 경험이 있다면!"
        text="로그인"
        onClick={handleLogin}
      />
      <div className="homePage-content">
        <BoxComponent height="482px">
          <TextComponent text="인터넷나이" fontSize="64px" strokeWidth="3px" />
          <TextComponent
            text="테스트"
            strokeWidth="2px"
            colorClass="textLightgreen"
            fontSize="42px"
          />

          <img className="mainImg" src={mainImg} width={198} />

          <TextComponent
            text={
              <>
                당신이 살고 있을
                <br />
                인터넷 세상의 나이를 찾아서..
              </>
            }
            colorClass="textYellow"
            fontSize="24px"
            strokeWidth="0.5px"
            style={{ marginTop: "0px" }}
          />
        </BoxComponent>
        <MainBtn
          text="진단하기"
          subText={`지금까지 ${count}명이 참여했어요`}
          onClick={handleTestClick}
        />
      </div>
    </div>
  );
}

export default Home;
