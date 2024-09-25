import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios를 import
import "./TestComponent.css";
import MainBtn from "./MainBtn";
import BoxComponent from "./BoxComponent";
import TextComponent from "./TextComponent";
import InputBox from "./InputBox";

function TestComponent() {
  const navigate = useNavigate();

  // 채팅 데이터를 담을 state
  const [leftChat, setLeftChat] = useState("");
  const [rightChat, setRightChat] = useState("");
  const [randomNum, setRandomNum] = useState(null); // 랜덤 문제 번호 저장

  // 백엔드로부터 데이터를 불러오는 함수
  useEffect(() => {
    // 1 ~ 20번 중 랜덤으로 문제 번호 선택
    const randomQuestionNum = Math.floor(Math.random() * 20) + 1;
    setRandomNum(randomQuestionNum); // 선택된 번호를 상태에 저장

    const fetchQuestion = async () => {
      try {
        const response = await axios.post("/Logged/test/calledQuestion", {
          num: randomQuestionNum, // 랜덤 문제 번호로 요청
        });
        setLeftChat(response.data.text1); // 왼쪽 채팅에 text1 설정
        setRightChat(response.data.text2); // 오른쪽 채팅에 text2 설정
      } catch (error) {
        console.error("Error fetching the question data:", error);
      }
    };

    fetchQuestion(); // 컴포넌트가 마운트될 때 데이터 불러오기
  }, []);

  const handleNextQuestion = () => {
    // 3초 동안 로딩 페이지 표시
    navigate("/loading");

    // 3초 후에 결과 페이지로 이동
    setTimeout(() => {
      navigate("/logged/type");
    }, 3000);
  };

  return (
    <div className="testComponent">
      <BoxComponent height="533px">
        <div className="questionContent">
          <TextComponent text={randomNum} fontSize="64px" strokeWidth="1px" />
          <div className="question">
            다음 대화를 보고, 녹색 대화창의 <br />
            의미를 작성하시오.
          </div>
        </div>

        <div className="chatContainer">
          {/* 받아온 DB 데이터를 채팅에 출력 */}
          <div className="chatBubble leftBubble">{leftChat}</div>
          <div className="chatBubble rightBubble">{rightChat}</div>
        </div>

        <InputBox text="정답을 입력해주세요." />
      </BoxComponent>
      <MainBtn
        text="다음문제"
        subText="못돌아가 히히"
        onClick={handleNextQuestion}
      />
    </div>
  );
}

export default TestComponent;
