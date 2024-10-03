import React, { useState, useEffect } from 'react';
import './Wordlist.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoxComponent from '../components/BoxComponent';
import TextComponent from '../components/TextComponent';

function AdWordList() {
  // const [wordData, setWordData] = useState({
  //   word: '',
  //   year: '',
  //   chat_first: '',
  // });

  const [wordDataList, setWordDataList] = useState([]); // 배열로 데이터를 받음

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWordData = async () => {
      try {
        const response = await axios.get('/process/wordlist'); // 서버에서 단어 목록 정보를 가져옴
        setWordDataList(response.data); // 단일 데이터가 아니라 배열로 저장
      } catch (error) {
        console.error('단어 정보를 가져오는 중 오류 발생:', error);
        alert('단어 정보를 가져오는 중 오류가 발생했습니다.');
      }
    };

    fetchWordData();
  }, []);

  return (
    <div className="wordlistPage">
      <BoxComponent width="356px" height="695px">
        <div className="wordlist-container">
          <div className="wordlistTitle">
            <TextComponent text="단어" colorClass="textYellow" fontSize="16px" shadowSize="1.8px" />
            <TextComponent text="년도" colorClass="textYellow" fontSize="16px" shadowSize="1.8px" />
            <TextComponent text="예시 대화" colorClass="textYellow" fontSize="16px" shadowSize="1.8px" />
          </div>

          {/* <div className="wordlistContent">
            <div className="lists">스불재</div>
            <div className="lists">2024</div>
            <div className="lists">이건 너의 스불재야.</div>
          </div> */}

          {wordDataList.map((wordData, index) => (
            <div key={index} className="wordlistContent">
              <div className="lists">스불재{wordData.word}</div>
              <div className="lists">2024{wordData.year}</div>
              <div className="lists">이건 너의 스불재야.{wordData.chat_first}</div>
            </div>
          ))}
        </div>
      </BoxComponent>
    </div>
  );
}

export default AdWordList;
