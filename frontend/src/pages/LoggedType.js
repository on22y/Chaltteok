import React, { useState, useEffect } from "react"; // useState와 useEffect를 import
import axios from "axios"; // axios를 import
import MypageComponent from "../components/MypageComponent";

function LoggedType() {
  const [state, setState] = useState(""); // state를 초기화

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/Logged/type/getResult");
        setState(response.data.state); // response에서 'state'로 받아온 값을 설정
      } catch (error) {
        console.error("Error fetching the type value:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="myPage">
      <MypageComponent
        type={`당신은 '${state}'!`} // state를 올바르게 참조
        detail={
          <>
            당장 주변 고등학교로 뛰어가서
            <br />
            즐거운 대화를 나누세요.
          </>
        }
      />
    </div>
  );
}

export default LoggedType;
