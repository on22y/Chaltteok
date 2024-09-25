import React, { useState, useEffect } from "react";
import axios from "axios";
import TypeComponent from "../components/TypeComponent";

function Type() {
  const [typeValue, setTypeValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/isLogged/type/getResult");
        setTypeValue(response.data.type);
      } catch (error) {
        console.error("Error fetching the type value:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="typePage">
      <TypeComponent
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

export default Type;
