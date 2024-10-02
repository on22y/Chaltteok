import React, { useState, useEffect } from 'react';
import './Word.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import TextComponent from '../components/TextComponent';
import backBtn from '../assets/images/backBtn.png';

function AdWordCheck() {
  const [wordData, setWordData] = useState({
    word: '',
    year: '',
    chat_first: '',
    chat_second: '',
    answer: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWordData = async () => {
      try {
        const response = await axios.get('/process/word'); // 서버에서 단어 정보를 가져옴
        setWordData(response.data);
      } catch (error) {
        console.error('단어 정보를 가져오는 중 오류 발생:', error);
        alert('단어 정보를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchWordData();
  }, []);

  // 단어 등록하기
  const handleSubmit = async () => {
    try {
      const response = await axios.post('/process/word/submit', { wordData });
      if (response.data.success) {
        alert('단어가 성공적으로 등록되었습니다.');
        navigate('/word/list');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('단어 등록 중 오류 발생:', error);
      alert('단어 등록 중 오류가 발생했습니다.');
    }
  };

  // 단어 반려하기
  const handleReject = async () => {
    try {
      const response = await axios.post('/process/word/reject', { wordData });
      if (response.data.success) {
        alert('단어가 반려되었습니다.');
        navigate('/word/list');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('단어 반려 중 오류 발생:', error);
      alert('단어 반려 중 오류가 발생했습니다.');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="wordPage">
      <div className="backBtn-content">
        <img className="backBtn" src={backBtn} width={19.35} height={38.35} onClick={handleBackClick} />
      </div>

      <TextComponent text="단어 정보 확인" fontSize="28px" strokeWidth="1px" />

      <BoxComponent width="356px" height="454px">
        <div className="wordCheckMain">
          <div className="wordCheckMaintitle">
            <TextComponent text="단어 : " colorClass="textYellow" fontSize="24px" strokeWidth="0.5px" />
            <TextComponent text="유행 년도 : " colorClass="textYellow" fontSize="20px" strokeWidth="0.5px" />
          </div>

          <div className="wordCheckMainContent">
            <TextComponent text={wordData.word} fontSize="24px" strokeWidth="0.5px" />
            <TextComponent text={wordData.year} fontSize="20px" strokeWidth="0.5px" />
          </div>
        </div>

        <div className="textWithLine">
          <TextComponent text="첫번째대화 :" colorClass="textYellow" fontSize="20px" strokeWidth="0.5px" />
          <div className="chats">{wordData.chat_first}</div>
        </div>

        <div className="textWithLine">
          <TextComponent text="두번째대화 :" colorClass="textYellow" fontSize="20px" strokeWidth="0.5px" />
          <div className="chats">{wordData.chat_second}</div>
        </div>

        <div className="textWithLine">
          <TextComponent text="뜻 :" colorClass="textYellow" fontSize="20px" strokeWidth="0.5px" />
          <div className="chats">{wordData.answer}</div>
        </div>
      </BoxComponent>

      <MainBtn text="등록하기" width="161px" height="57px" fontSize="20px" onClick={handleSubmit} />
      <MainBtn
        text="반려하기"
        width="161px"
        height="57px"
        fontSize="20px"
        backgroundColor="#FF4E4E"
        onClick={handleReject}
      />
    </div>
  );
}

export default AdWordCheck;
