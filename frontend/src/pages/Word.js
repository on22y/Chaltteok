import React, { useState } from 'react';
import './Word.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainBtn from '../components/MainBtn';
import BoxComponent from '../components/BoxComponent';
import TextComponent from '../components/TextComponent';
import InputBox from '../components/InputBox';
import SelectBtn from '../components/SelectBtn';
import backBtn from '../assets/images/backBtn.png';

function Word() {
  const [word, setWord] = useState('');
  const [chat_first, setChat_first] = useState('');
  const [chat_second, setChat_second] = useState('');
  const [answer, setAnswer] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (word && chat_first && chat_second && answer) {
      const wordData = {
        word,
        chat_first,
        chat_second,
        answer,
      };

      try {
        // 서버로 신조어 제보 요청을 보냄
        const response = await axios.post('/process/word', wordData);
        const result = response.data;

        if (result.success) {
          alert('신조어 등록 성공!');
          navigate('/');
        } else {
          alert(result.message);
        }
      } catch (error) {
        console.error('신조어 등록 중 오류 발생:', error);
        alert('신조어 등록 중 오류가 발생했습니다.');
      }
    } else {
      alert('모든 정보를 입력해주세요.');
    }
  };

  // 뒤로 가기 버튼 클릭 시 이전 페이지로 이동
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="wordPage">
      <div className="backBtn-content">
        <img className="backBtn" src={backBtn} width={19.35} height={38.35} onClick={handleBackClick} />
      </div>

      <TextComponent text="단어 정보 입력" fontSize="28px" strokeWidth="1px" />

      <BoxComponent height="468px">
        <TextComponent text="단어 입력" colorClass="textYellow" fontSize="24px" strokeWidth="0.5px" />
        <InputBox text="단어를 입력해주세요." value={word} onChange={(e) => setWord(e.target.value)} />

        <div className="yearSelectionRow">
          <TextComponent text="유행 년도" colorClass="textYellow" fontSize="24px" strokeWidth="0.5px" />
          <SelectBtn />
        </div>

        <TextComponent text="예시 대화" colorClass="textYellow" fontSize="24px" strokeWidth="0.5px" />
        <div className="inputBoxForChat">
          <InputBox
            text="첫번째 대화를 입력해주세요."
            value={chat_first}
            onChange={(e) => setChat_first(e.target.value)}
          />
        </div>
        <InputBox
          text="두번째 대화를 입력해주세요."
          value={chat_second}
          onChange={(e) => setChat_second(e.target.value)}
        />

        <TextComponent text="뜻" colorClass="textYellow" fontSize="24px" strokeWidth="0.5px" />
        <InputBox text="대화의 정답을 입력해주세요." value={answer} onChange={(e) => setAnswer(e.target.value)} />
      </BoxComponent>
      <MainBtn text="신조어 제보" subText="라떼는 단어도 언젠가는 신조어!" onClick={handleSubmit} />
    </div>
  );
}

export default Word;
