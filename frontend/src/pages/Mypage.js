import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Mypage.css';
import TextComponent from '../components/TextComponent';
import TypeComponent from '../components/TypeComponent';
import UnderlineBtn from '../components/UnderlineBtn';
import MainBtn from '../components/MainBtn';
import lineImg from '../assets/images/lineImg.png';
import mypageImg from '../assets/images/mypageImg.png';

function Mypage() {
  const [state, setState] = useState('');

  const navigate = useNavigate();

  const handleLoggedTestClick = () => {
    navigate('/Logged/test');
  };

  const handleWordClick = () => {
    navigate('/word');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/Logged/type/getResult');
        setState(response.data.state); // response에서 'state'로 받아온 값을 설정
      } catch (error) {
        console.error('Error fetching the type value:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mypage">
      <TypeComponent
        type={`당신은 '${state}'!`} // state를 올바르게 참조
        detail={
          <>
            당장 주변 고등학교로 뛰어가서
            <br />
            즐거운 대화를 나누세요.
          </>
        }
      />

      <MainBtn text="진단 다시하기" subText="여전히 내 나이 인정 못한다면?" onClick={handleLoggedTestClick} />
      <img className="lineImg" src={lineImg} width={318} />
      <MainBtn
        text="신조어 제보"
        subText="요즘은 이런단어 쓴단다 ~"
        width="130px"
        height="48px"
        fontSize="18px"
        onClick={handleWordClick}
      />
    </div>
  );
}

export default Mypage;
