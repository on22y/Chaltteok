import React, { useState, useEffect } from "react"; // useState와 useEffect를 import
import axios from "axios"; // axios를 import
import MypageComponent from "../components/MypageComponent";

function Mypage() {
  const [typeValue, setTypeValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/Logged/type/getResult");
        setTypeValue(response.data.type);
      } catch (error) {
        console.error("Error fetching the type value:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="myPage">
      <MypageComponent
        type={`당신은 '${typeValue}'!`}
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

export default Mypage;
