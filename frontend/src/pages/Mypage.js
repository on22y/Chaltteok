import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Mypage.css';
import TypeComponent from '../components/TypeComponent';
import MainBtn from '../components/MainBtn';
import lineImg from '../assets/images/lineImg.png';

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
        console.log('1번');
        const response = await axios.get('/mypage/getResult');
        console.log('Response 전체:', response); // response 객체 전체를 로그로 출력
        setState(response.data.state); // response에서 'state'로 받아온 값을 설정
        console.log('3번, state:', response.data.state);
      } catch (error) {
        console.error('Error fetching the type value:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mypage">
      <TypeComponent
        state={state}
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
        shadowSize={1.9}
        onClick={handleWordClick}
      />
    </div>
  );
}

export default Mypage;
