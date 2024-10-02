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
    // 서버에서 현재 카운트를 가져온 후 닉네임을 생성
    axios
      .get("/api/get-count")
      .then((countResponse) => {
        const currentCount = countResponse.data.count; // 현재 카운트를 가져옴
        const generatedNickname = `user_${currentCount}`; // 카운트 기반 닉네임 생성

        // 생성된 닉네임으로 서버에 저장 요청
        axios
          .post("/api/create-anonymous-user", { nickname: generatedNickname })
          .then((response) => {
            if (response.data.success) {
              // 성공적으로 닉네임이 생성되면 카운트 증가 후 다음 페이지로 이동
              axios.post("/api/increase-count").then((increaseResponse) => {
                setCount(increaseResponse.data.count); // 업데이트된 카운트로 상태 업데이트
                navigate("/isLogged/test");
              });
            }
          })
          .catch((error) => {
            console.error("Error creating anonymous user:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching current count:", error);
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

          <img className="imgComponent" src={mainImg} width={198} />

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
